# Title: Liquid Widont
# Authors: Olaf Veerman - olaf@flipside.org
#
# Description: Provides a Liquid Filter that prevents widows on texts by replacing the space between the last two words with a non-breaking space.
#
# Example: {{ post.title | widont }}
#
# Allows you to turn this:
# | You have to see it to believe |
# | it                            |
#
# into this:
# | You have to see it to         |
# | believe it                    |

require 'liquid'

module PreventWidow
  def widont(text)
  	unless text.nil? || text == 0
		  if text.split.size > 3
		  	text.gsub(/&nbsp;([^\s]+)$/, ' \1').gsub(/\s([^\s]+)\s*$/, '&nbsp;\1')
		  else
		  	text
		  end
		end
  end
end

Liquid::Template.register_filter(PreventWidow)