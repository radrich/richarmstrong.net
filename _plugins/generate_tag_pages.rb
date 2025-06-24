# _plugins/generate_tag_pages.rb

module Jekyll
  class GenerateTagPages < Generator
    safe true

    def generate(site)
      # Get all tags from posts and items
      all_tags = site.posts.docs.flat_map { |post| post['tags'] }.uniq
      all_tags += site.collections['items'].docs.flat_map { |item| item['tags'] }.uniq
      all_tags = all_tags.uniq.sort

      all_tags.each do |tag|
        tag_slug = Jekyll::Utils.slugify(tag)
        site.pages << TagPage.new(site, site.source, File.join('tags', tag_slug), tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "Tag: #{tag}"
    end
  end
end
