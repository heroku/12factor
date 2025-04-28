require 'toml-rb'
require 'front_matter_parser'

module TwelveFactor

  class Author
    attr_reader :id
    attr_reader :name
    attr_reader :github_username

    def initialize(id, toml)
      @id = id
      @toml = toml
      @name = toml['name']
      @github_username = toml['github_username']
    end

    def image_path
      "/images/bios/#{@id}.jpg"
    end

    def maintainer?
      @toml['maintainer']
    end

    def description
      @toml['description'] ? MARKDOWN.render(@toml['description']) : ""
    end
  end

  class Authors
    def initialize
      @authors = TomlRB.load_file("#{ROOT}/blog/authors.toml")
    end

    def get(id)
      author = @authors.fetch(id)
      Author.new(id, author)
    end
  end

  AUTHORS = Authors.new

  class BlogPost
    # A file is a blog post if it has front-matter (i.e. it starts with `---`)
    def self.is(file)
      File.read(file, :encoding => 'utf-8').strip.start_with?('---')
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

    attr_reader :content
    attr_reader :front_matter
    attr_reader :file_path
    attr_reader :excerpt
    attr_reader :slug

    def initialize(file)
      @file_path = file
      @slug = File.basename(file, '.md')
      file_content = File.read(file, :encoding => 'utf-8')
      # Configure the parser to allow Date objects
      parser = FrontMatterParser::Parser.new(:md, loader: FrontMatterParser::Loader::Yaml.new(allowlist_classes: [Date]))
      @front_matter = parser.call(file_content)
      @content = file_content.split('---', 3)[2].to_s.strip
      @excerpt = BlogPost.excerpt(file_content)
    end

    def image_path
      nil
    end
    
    def render
      MARKDOWN.render(@content)
    end

    def author
      AUTHORS.get(@front_matter['author'])
    end

    def date
      @front_matter['date'].strftime('%d %b, %Y')
    end

    def title
      @front_matter['title']
    end

    def categories?
      @front_matter['categories']
    end

    def categories
      @front_matter['categories'] || []
    end

    def featured?
      @front_matter['featured']
    end

    def url
      "/blog/#{@slug}"
    end
  end

  class Blog
    def initialize
      post_files = Dir["#{ROOT}/blog/*.md"]

      @posts = post_files.filter_map do |file|
        BlogPost.new(file) if BlogPost.is(file)
      end

      @posts.sort_by! { |post| post.date }
    end

    def all
      @posts
    end

    def featured
      @posts.select(&:featured?)
    end

    def find(slug)
      @posts.find { |post| post.slug == slug }
    end
  end

  BLOG = Blog.new
end
