# _plugins/date_filters.rb
module Jekyll
  module DateFilters
    require 'date'
    
    def to_unix_timestamp(date)
      begin
        DateTime.parse(date.to_s).strftime('%s').to_i
      rescue ArgumentError => e
        puts "Date parsing error: #{e.message}"
        return 0
      end
    end

    def subtract_months(date, months)
      begin
        (Date.parse(date.to_s) << months).to_s
      rescue ArgumentError => e
        puts "Date parsing error: #{e.message}"
        return ''
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateFilters)
