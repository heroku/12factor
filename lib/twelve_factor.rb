require 'toml-rb'
require 'front_matter_parser'

module TwelveFactor
  ROOT = File.expand_path("..", __dir__)
end

require_relative "document"
require_relative "factors"
require_relative "blog"