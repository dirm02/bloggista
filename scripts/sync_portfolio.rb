#!/usr/bin/env ruby
# Syncs portfolio projects from mystars repo
# Scans ALL starred-readmes-{Category}/ folders for projects
# Outputs assets/data/portfolio.json for client-side rendering

require 'yaml'
require 'fileutils'
require 'json'

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

  # Track projects by slug to avoid duplicates across categories
  seen = {}
  projects = []

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

      # Skip duplicates (same project in multiple categories - keep first)
      next if seen[entry]
      seen[entry] = true

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

      projects << {
        'name' => entry.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' '),
        'slug' => entry,
        'category' => category,
        'image' => image,
        'repo_url' => repo_url,
        'indexed_content' => indexed_content
      }
      cat_count += 1
    end

    puts "  #{category}: #{cat_count} projects"
  end

  projects.sort_by { |p| p['name'].downcase }
end

def write_portfolio_json(projects, output_file)
  data = projects.map do |p|
    {
      'name' => p['name'],
      'slug' => p['slug'],
      'category' => p['category'],
      'image' => p['image'],
      'repo_url' => p['repo_url'],
      'indexed_content' => p['indexed_content']
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

  # Print category summary
  cats = {}
  projects.each { |p| cats[p['category']] = (cats[p['category']] || 0) + 1 }
  puts "\nCategory summary:"
  cats.sort_by { |k, _| k.downcase }.each { |k, v| puts "  #{k}: #{v}" }
  puts "  TOTAL: #{projects.size} unique projects"

  count = write_portfolio_json(projects, output_file)
  puts "\nWrote #{count} projects to #{output_file}"
end

main
