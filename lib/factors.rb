require "toml-rb"

module TwelveFactor
  FACTOR_ROOT = "#{ROOT}/content"

  class Factors

    # The factors are loaded from the `content` directory. In that directory,
    # the factors are stored in subdirectories named after a locale (e.g. `en`,
    # `fr`, `es`, etc.). Each locale has a localized `toc.md` file and separate
    # files for each factor.
    # 
    # The `factors.toml` file contains the list of factors in order.
    #
    # This class is used to load the factors and return them as a list of
    # localized factors.
    def self.load
      factors = TomlRB.load_file("#{ROOT}/content/factors.toml")['factors']
      locales = Dir.glob("#{FACTOR_ROOT}/*").map { |dir| File.basename(dir) }
      Factors.new(factors, locales)
    end

    attr_reader :factor_names

    def initialize(factor_names, locales)
      @factor_names = factor_names
      @locales = locales
    end

    def current
      self[I18n.locale]
    end
  
    def [](locale)
      LocalizedFactors.new(locale)
    end

    def locales
      @locales
    end
  end

  FACTORS = Factors.load

  class LocalizedFactors
    FRAGMENTS = [:intro, :who, :background, :toc]

    attr_reader :locale

    def initialize(locale)
      @locale = locale
      @root = "#{FACTOR_ROOT}/#{locale}"
      @documents = {}
    end


    FRAGMENTS.each do |fragment|
      define_method(fragment) do
        @documents[fragment] ||= load_document(fragment)
      end
    end

    def [](id)
      return nil unless FACTORS.factor_names.include?(id)
    
      file = "#{@root}/#{id}.md"
      TwelveFactor::Document.parse(file)
    end

    # Returns a list of `LocalizedFactor` objects for each factor in
    # `FACTORS.factor_names`.
    def factors
      FACTORS.factor_names.map do |id|
        self[id]
      end
    end

    private
    def load_document(file)
      @documents[file] ||= TwelveFactor::Document.parse("#{@root}/#{file}.md")
    end
  end

  class LocalizedFactor
    def initialize(id, file)
      @id = id
      @file = file
    end

    def document
      TwelveFactor::Document.parse(@file)
    end
  end

end
