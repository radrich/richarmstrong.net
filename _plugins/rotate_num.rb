# _plugins/rotate_num_tag.rb
module Jekyll
  class RotateNumTag < Liquid::Tag
    def render(context)
      rand(1..10).to_s
    end
  end
end

Liquid::Template.register_tag('rotate_num', Jekyll::RotateNumTag)