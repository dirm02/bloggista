#!/usr/bin/env ruby
# Syncs portfolio projects from mystars repo (starred-readmes/folder per project with README.md)
# Outputs _data/portfolio_projects.yml for Jekyll

require 'yaml'
require 'fileutils'

MYSTARS_BASE = 'https://raw.githubusercontent.com/dirm02/mystars/main'
STARRED_READMES = 'starred-readmes'
PLACEHOLDER_IMAGE = '/assets/images/portfolio-placeholder.svg'

def projects_base_path(mystars_root)
  sr = File.join(mystars_root, STARRED_READMES)
  Dir.exist?(sr) ? sr : mystars_root
end

def raw_base_for_folder(base_path, mystars_root)
  prefix = base_path.include?(STARRED_READMES) ? "#{STARRED_READMES}/" : ''
  "#{MYSTARS_BASE}/#{prefix}"
end

def folder_to_repo_url(folder_name, base_path)
  # Link to mystars folder - README there has links to original repo
  prefix = base_path.include?(STARRED_READMES) ? "#{STARRED_READMES}/" : ''
  "https://github.com/dirm02/mystars/tree/main/#{prefix}#{folder_name}"
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

def extract_description(readme_path, max_len = 100)
  return '' unless File.file?(readme_path)
  content = File.read(readme_path)
  # Remove frontmatter if present
  content = content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')
  # First paragraph (lines until blank line)
  para = content.split(/\n\n+/).first.to_s.strip
  para = para.gsub(/\n/, ' ').gsub(/\[([^\]]+)\]\([^)]+\)/, '\1') # remove links, keep text
  para.length > max_len ? "#{para[0...max_len]}..." : para
end

def process_mystars(mystars_path)
  projects = []
  base_path = projects_base_path(mystars_path)
  return projects unless Dir.exist?(base_path)

  raw_base = raw_base_for_folder(base_path, mystars_path)

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

    repo_url = folder_to_repo_url(entry, base_path)
    desc = extract_description(readme_path)

    projects << {
      'name' => entry.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' '),
      'slug' => entry,
      'image' => image,
      'repo_url' => repo_url,
      'description' => desc
    }
  end

  projects.sort_by { |p| p['name'].downcase }
end

def main
  mystars_path = ARGV[0] || raise('Usage: sync_portfolio.rb <mystars_path>')
  output_path = ARGV[1] || File.join(__dir__, '..', '_data', 'portfolio_projects.yml')

  projects = process_mystars(mystars_path)
  File.write(output_path, projects.to_yaml)
  puts "Wrote #{projects.size} projects to #{output_path}"
end

main
