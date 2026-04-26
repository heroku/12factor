# Minimal RSpec setup for the 12factor Sinatra smoke suite.
# Layer L4 (smoke) of the workspace verification ladder.
# See heroku/3pp-grackle/docs/verification-specs/12factor.md.

ENV['RACK_ENV'] ||= 'test'

require 'rack/test'
require_relative '../web.rb'

RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
  config.disable_monkey_patching!
end

# Sinatra's classic style: the entire `Sinatra::Application` IS the app.
# Rack::Test::Methods uses `app` as the rack app under test.
def app
  Sinatra::Application
end
