#!/usr/bin/env ruby
# Syncs portfolio projects from mystars repo
# Scans ALL starred-readmes-{Category}/ folders for projects
# Outputs assets/data/portfolio.json for client-side rendering

require 'yaml'
require 'fileutils'
require 'json'
require 'net/http'
require 'uri'
require 'time'

PLACEHOLDER_IMAGE = '/assets/images/portfolio-placeholder.svg'

def get_mystars_branch(mystars_path)
  out = `git -C "#{mystars_path}" rev-parse --abbrev-ref HEAD 2>&1`.strip
  return 'master' if out.empty? || out.include?('fatal:')
  out
end

def mystars_base_url(branch)
  "https://raw.githubusercontent.com/dirm02/mystars/#{branch}"
end

def extract_original_repo_from_readme(readme_path)
  return nil unless File.file?(readme_path)
  content = File.read(readme_path)
  content.scan(%r{https?://github\.com/([^/\s"'<>]+)/([^/\s"'<>#?)+]+)}) do |owner, repo|
    next if owner == 'dirm02' && repo == 'mystars'
    return "https://github.com/#{owner}/#{repo}"
  end
  nil
end

def fetch_github_repo_metadata(repo_url)
  # Extract owner/repo from URL
  match = repo_url.match(%r{github\.com/([^/]+)/([^/\s#?]+)})
  return {} unless match
  
  owner, repo = match[1], match[2]
  api_url = "https://api.github.com/repos/#{owner}/#{repo}"
  
  begin
    uri = URI(api_url)
    request = Net::HTTP::Get.new(uri)
    request['Accept'] = 'application/vnd.github.v3+json'
    request['User-Agent'] = 'Portfolio-Sync-Script'
    
    # Add GitHub token if available (for higher rate limits)
    github_token = ENV['GITHUB_TOKEN']
    request['Authorization'] = "token #{github_token}" if github_token
    
    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true, read_timeout: 5) do |http|
      http.request(request)
    end
    
    if response.code == '200'
      data = JSON.parse(response.body)
      return {
        language: data['language'],
        stars: data['stargazers_count'] || 0,
        last_updated: data['pushed_at'] ? Time.parse(data['pushed_at']).iso8601 : nil
      }
    else
      puts "  Warning: GitHub API returned #{response.code} for #{repo_url}"
    end
  rescue StandardError => e
    puts "  Warning: Failed to fetch metadata for #{repo_url}: #{e.message}"
  end
  
  {}
end

def extract_first_image_from_readme(readme_path, folder_name, raw_base)
  return nil unless File.file?(readme_path)

  content = File.read(readme_path)
  folder_base = "#{raw_base}#{folder_name}"

  if content =~ /!\[[^\]]*\]\(([^)\s]+)\)/
    url = Regexp.last_match(1).strip
    if url.start_with?('./')
      url = "#{folder_base}/#{url[2..]}"
    elsif url.start_with?('/')
      url = "#{folder_base}#{url}"
    elsif !url.start_with?('http')
      url = "#{folder_base}/#{url}"
    end
    return url
  end

  if content =~ /<img[^>]+src=["']([^"']+)["']/
    url = Regexp.last_match(1).strip
    if url.start_with?('./')
      url = "#{folder_base}/#{url[2..]}"
    elsif url.start_with?('/')
      url = "#{folder_base}#{url}"
    elsif !url.start_with?('http')
      url = "#{folder_base}/#{url}"
    end
    return url
  end

  nil
end

def find_first_image_in_folder(folder_path)
  exts = %w[.png .jpg .jpeg .gif .svg .webp]
  Dir.foreach(folder_path) do |f|
    next if f.start_with?('.')
    path = File.join(folder_path, f)
    next unless File.file?(path)
    return f if exts.any? { |ext| f.downcase.end_with?(ext) }
  end
  nil
end

def read_readme_content(readme_path)
  return '' unless File.file?(readme_path)
  content = File.read(readme_path)
  content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')
end

def index_readme_content(content, max_length = 1000)
  return '' if content.nil? || content.empty?
  indexed = content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')
  indexed = indexed.gsub(/<[^>]+>/, ' ')
  indexed = indexed.gsub(/\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/, '')
  indexed = indexed.gsub(/!\[[^\]]*\]\([^)]+\)/, '')
  indexed = indexed.gsub(/\[([^\]]+)\]\([^)]+\)/, '\1')
  indexed = indexed.gsub(%r{https?://\S+}, '')
  indexed = indexed.gsub(/[#*_`~|>]/, ' ')
  indexed = indexed.gsub(/\s+/, ' ').strip
  indexed.length > max_length ? indexed[0...max_length] : indexed
end

def discover_category_folders(mystars_path)
  folders = []
  Dir.foreach(mystars_path) do |entry|
    next if entry.start_with?('.')
    next unless entry.start_with?('starred-readmes-')
    full_path = File.join(mystars_path, entry)
    next unless File.directory?(full_path)

    # Extract category name from folder: "starred-readmes-AI-automation" -> "AI-automation"
    category = entry.sub(/^starred-readmes-/, '')
    folders << { path: full_path, category: category, folder_name: entry }
  end
  folders.sort_by { |f| f[:category].downcase }
end

def process_mystars(mystars_path)
  branch = get_mystars_branch(mystars_path)
  branch = 'master' if branch.nil? || branch.empty?

  category_folders = discover_category_folders(mystars_path)

  if category_folders.empty?
    puts "Warning: No starred-readmes-* category folders found"
    return []
  end

  puts "Found #{category_folders.size} category folders"

  # One entry per unique project (slug); each project has categories: [ ... ]
  projects_by_slug = {}

  category_folders.each do |cat_info|
    cat_path = cat_info[:path]
    category = cat_info[:category]
    cat_folder_name = cat_info[:folder_name]
    raw_base = "#{mystars_base_url(branch)}/#{cat_folder_name}/"
    cat_count = 0

    Dir.foreach(cat_path) do |entry|
      next if entry.start_with?('.')
      folder_path = File.join(cat_path, entry)
      next unless File.directory?(folder_path)

      if projects_by_slug.key?(entry)
        # Already seen: just add this category
        projects_by_slug[entry][:categories] << category unless projects_by_slug[entry][:categories].include?(category)
        cat_count += 1
        next
      end

      readme_path = File.join(folder_path, 'README.md')
      readme_path = File.join(folder_path, 'readme.md') unless File.file?(readme_path)

      image = extract_first_image_from_readme(readme_path, entry, raw_base)
      image = nil if image && !image.start_with?('http')

      if image.nil?
        img_file = find_first_image_in_folder(folder_path)
        image = "#{raw_base}#{entry}/#{img_file}" if img_file
      end

      image = PLACEHOLDER_IMAGE if image.nil? || image.empty?

      repo_url = extract_original_repo_from_readme(readme_path)
      if repo_url.nil? || repo_url.empty?
        repo_url = "https://github.com/dirm02/mystars/tree/#{branch}/#{cat_folder_name}/#{entry}"
      end

      readme_content = read_readme_content(readme_path)
      indexed_content = index_readme_content(readme_content)
      
      # Fetch GitHub metadata (language, stars, last_updated)
      metadata = {}
      if repo_url && repo_url.include?('github.com') && !repo_url.include?('dirm02/mystars')
        metadata = fetch_github_repo_metadata(repo_url)
        sleep(0.1) # Rate limiting: 10 requests per second max
      end

      projects_by_slug[entry] = {
        name: entry.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' '),
        slug: entry,
        categories: [category],
        image: image,
        repo_url: repo_url,
        indexed_content: indexed_content,
        language: metadata[:language],
        stars: metadata[:stars] || 0,
        last_updated: metadata[:last_updated]
      }
      cat_count += 1
    end

    puts "  #{category}: #{cat_count} projects"
  end

  projects = projects_by_slug.values.map do |p|
    {
      'name' => p[:name],
      'slug' => p[:slug],
      'categories' => p[:categories].sort,
      'image' => p[:image],
      'repo_url' => p[:repo_url],
      'indexed_content' => p[:indexed_content],
      'language' => p[:language],
      'stars' => p[:stars],
      'last_updated' => p[:last_updated]
    }
  end

  projects.sort_by { |p| p['name'].downcase }
end

def write_portfolio_json(projects, output_file)
  data = projects.map do |p|
    {
      'name' => p['name'],
      'slug' => p['slug'],
      'categories' => p['categories'],
      'image' => p['image'],
      'repo_url' => p['repo_url'],
      'indexed_content' => p['indexed_content'],
      'language' => p['language'],
      'stars' => p['stars'],
      'last_updated' => p['last_updated']
    }
  end
  File.write(output_file, JSON.pretty_generate(data))
  data.size
end

def main
  mystars_path = ARGV[0] || raise('Usage: sync_portfolio.rb <mystars_path>')
  blog_root = File.expand_path(File.join(__dir__, '..'))
  assets_data_dir = File.join(blog_root, 'assets', 'data')
  FileUtils.mkdir_p(assets_data_dir)

  output_file = File.join(assets_data_dir, 'portfolio.json')

  projects = process_mystars(mystars_path)

  # Print category summary (project count per category)
  cats = {}
  projects.each do |p|
    (p['categories'] || []).each { |c| cats[c] = (cats[c] || 0) + 1 }
  end
  puts "\nCategory summary (projects per category):"
  cats.sort_by { |k, _| k.downcase }.each { |k, v| puts "  #{k}: #{v}" }
  puts "  TOTAL: #{projects.size} unique projects"

  count = write_portfolio_json(projects, output_file)
  puts "\nWrote #{count} projects to #{output_file}"
end

main
