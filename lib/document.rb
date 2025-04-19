require 'redcarpet'

module TwelveFactor
  MARKDOWN = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)

  class Document
    def self.parse(file, excerpt: false)
      file_content = File.read(file, :encoding => 'utf-8')
      # Configure the parser to allow Date objects
      parser = FrontMatterParser::Parser.new(:md, loader: FrontMatterParser::Loader::Yaml.new(allowlist_classes: [Date]))
      parsed = parser.call(file_content)
      content = parsed.content.strip
      excerpt = excerpt ? Document.excerpt(content) : nil
      Document.new(parsed.front_matter, content, excerpt)
    end


    def self.excerpt(content)
      # Skip front matter
      content_without_frontmatter = if content.start_with?('---')
        content.split('---', 3)[2].to_s.strip
      else
        content
      end
 
      # Get excerpt (content until the END_EXCERPT marker)
      if content_without_frontmatter.include?('<!-- END_EXCERPT -->')
        content_without_frontmatter.split('<!-- END_EXCERPT -->').first.strip
      else
        # Fallback to first paragraph if no marker is found
        content_without_frontmatter.split(/\n\n/).first.to_s.strip
      end
    end

    
    attr_reader :front_matter
    attr_reader :content
    attr_reader :excerpt

    def initialize(front_matter, content, excerpt)
      @front_matter = front_matter
      @content = content
      @excerpt = excerpt
    end

    def render
      MARKDOWN.render(@content)
    end  
  end
end
