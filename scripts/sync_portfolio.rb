#!/usr/bin/env ruby
# Syncs portfolio projects from mystars repo (starred-readmes/folder per project with README.md)
# Writes _portfolio/*.md (Jekyll collection) with full README content and rewritten image URLs
# Links to ORIGINAL GitHub repos extracted from README (not mystars copies)

require 'yaml'
require 'fileutils'

STARRED_READMES = 'starred-readmes'
PLACEHOLDER_IMAGE = '/assets/images/portfolio-placeholder.svg'

def get_mystars_branch(mystars_path)
  out = `git -C "#{mystars_path}" rev-parse --abbrev-ref HEAD 2>&1`.strip
  return 'master' if out.empty? || out.include?('fatal:')
  out
end

def mystars_base_url(branch)
  "https://raw.githubusercontent.com/dirm02/mystars/#{branch}"
end

def projects_base_path(mystars_root)
  sr = File.join(mystars_root, STARRED_READMES)
  Dir.exist?(sr) ? sr : mystars_root
end

def raw_base_for_folder(base_path, branch)
  prefix = base_path.include?(STARRED_READMES) ? "#{STARRED_READMES}/" : ''
  "#{mystars_base_url(branch)}/#{prefix}"
end

def sanitize_slug_for_filename(slug)
  slug.to_s.gsub(/[\\\/:*?"<>|]/, '-')
end

def extract_original_repo_from_readme(readme_path)
  return nil unless File.file?(readme_path)
  content = File.read(readme_path)
  # Match https://github.com/owner/repo (base repo URL, exclude dirm02/mystars)
  content.scan(%r{https?://github\.com/([^/\s"'<>]+)/([^/\s"'<>#?]+)}) do |owner, repo|
    next if owner == 'dirm02' && repo == 'mystars'
    return "https://github.com/#{owner}/#{repo}"
  end
  nil
end

def folder_to_repo_url_fallback(folder_name, base_path, branch)
  prefix = base_path.include?(STARRED_READMES) ? "#{STARRED_READMES}/" : ''
  "https://github.com/dirm02/mystars/tree/#{branch}/#{prefix}#{folder_name}"
end

def rewrite_readme_image_urls(content, folder_name, raw_base)
  return content if content.nil? || content.empty?
  folder_base = "#{raw_base}#{folder_name}"

  # Rewrite ![alt](relative_url) in markdown
  content = content.gsub(/!\[([^\]]*)\]\(([^)]+)\)/) do
    alt = Regexp.last_match(1)
    url = Regexp.last_match(2).strip
    if url.start_with?('http://', 'https://')
      "![#{alt}](#{url})"
    elsif url.start_with?('./')
      "![#{alt}](#{folder_base}/#{url[2..]})"
    elsif url.start_with?('/')
      "![#{alt}](#{folder_base}#{url})"
    else
      "![#{alt}](#{folder_base}/#{url})"
    end
  end

  # Rewrite <img src="relative_url">
  content = content.gsub(/<img([^>]+)src=["']([^"']+)["']/) do
    attrs = Regexp.last_match(1)
    url = Regexp.last_match(2).strip
    if url.start_with?('http://', 'https://')
      "<img#{attrs}src=\"#{url}\""
    elsif url.start_with?('./')
      "<img#{attrs}src=\"#{folder_base}/#{url[2..]}\""
    elsif url.start_with?('/')
      "<img#{attrs}src=\"#{folder_base}#{url}\""
    else
      "<img#{attrs}src=\"#{folder_base}/#{url}\""
    end
  end

  content
end

def extract_first_image_from_readme(readme_path, folder_name, raw_base)
  return nil unless File.file?(readme_path)

  content = File.read(readme_path)
  folder_base = "#{raw_base}#{folder_name}"

  # Match ![alt](url) - capture url
  if content =~ /!\[[^\]]*\]\(([^)\s]+)\)/
    url = Regexp.last_match(1).strip
    # Resolve relative URLs
    if url.start_with?('./')
      url = "#{folder_base}/#{url[2..]}"
    elsif url.start_with?('/')
      url = "#{folder_base}#{url}"
    elsif !url.start_with?('http')
      url = "#{folder_base}/#{url}"
    end
    return url
  end

  # Match <img src="url">
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
  # Remove frontmatter if present (Jekyll will use our own frontmatter)
  content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')
end

def process_mystars(mystars_path)
  projects = []
  base_path = projects_base_path(mystars_path)
  return projects unless Dir.exist?(base_path)

  branch = get_mystars_branch(mystars_path)
  branch = 'master' if branch.nil? || branch.empty?
  raw_base = raw_base_for_folder(base_path, branch)

  Dir.foreach(base_path) do |entry|
    next if entry.start_with?('.')
    folder_path = File.join(base_path, entry)
    next unless File.directory?(folder_path)

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
    repo_url = folder_to_repo_url_fallback(entry, base_path, branch) if repo_url.nil? || repo_url.empty?

    readme_content = read_readme_content(readme_path)
    readme_content = rewrite_readme_image_urls(readme_content, entry, raw_base)

    projects << {
      'name' => entry.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' '),
      'slug' => entry,
      'image' => image,
      'repo_url' => repo_url,
      'readme' => readme_content
    }
  end

  projects.sort_by { |p| p['name'].downcase }
end

def write_portfolio_collection(projects, output_dir)
  FileUtils.mkdir_p(output_dir)
  # Clear existing files
  Dir.foreach(output_dir) do |f|
    next if f.start_with?('.')
    path = File.join(output_dir, f)
    File.delete(path) if File.file?(path)
  end

  count = 0
  projects.each do |p|
    filename = "#{sanitize_slug_for_filename(p['slug'])}.md"
    filepath = File.join(output_dir, filename)

    frontmatter = {
      'layout' => 'project',
      'name' => p['name'],
      'slug' => p['slug'],
      'image' => p['image'],
      'repo_url' => p['repo_url']
    }

    body = p['readme'].to_s
    # Wrap in {% raw %} so Liquid doesn't interpret {{ }} in README (e.g. JS/JSON code)
    body = "{% raw %}\n" + body + "\n{% endraw %}"
    content = frontmatter.to_yaml.chomp + "\n---\n" + body
    File.write(filepath, content)
    count += 1
  end
  count
end

def main
  mystars_path = ARGV[0] || raise('Usage: sync_portfolio.rb <mystars_path>')
  blog_root = File.expand_path(File.join(__dir__, '..'))
  portfolio_dir = File.join(blog_root, '_portfolio')

  projects = process_mystars(mystars_path)
  count = write_portfolio_collection(projects, portfolio_dir)
  puts "Wrote #{count} projects to #{portfolio_dir}"
end

main
