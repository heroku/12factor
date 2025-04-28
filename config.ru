require 'rack/unreloader'
Unreloader = Rack::Unreloader.new {App}
Unreloader.record_dependency 'web.rb', %w[lib/twelve_factor.rb]
Unreloader.require './web.rb'

run Unreloader
