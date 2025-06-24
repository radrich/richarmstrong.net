# _plugins/generate_category_pages.rb

module Jekyll
  class GenerateCategoryPages < Generator
    safe true

    def generate(site)
      # Get all categories from posts, art and learn collections
      all_categories = site.posts.docs.flat_map { |post| post['categories'] }.uniq
      all_categories += site.collections['learn'].docs.flat_map { |learn| learn['categories'] }.uniq
      all_categories += site.collections['art'].docs.flat_map { |art| art['categories'] }.uniq
      all_categories = all_categories.uniq.sort

      all_categories.each do |category|
        category_slug = Jekyll::Utils.slugify(category)
        site.pages << CategoryPage.new(site, site.source, File.join('categories', category_slug), category)
      end
    end
  end

  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['category'] = category
      self.data['title'] = "category: #{category}"
    end
  end
end
