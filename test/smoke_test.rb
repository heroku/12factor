require 'rack/test'
require 'minitest/autorun'

ENV['RACK_ENV'] = 'test'

require_relative '../web'

class SmokeTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_homepage_returns_200
    get '/'
    assert_equal 200, last_response.status
    assert_includes last_response.body, 'twelve-factor'
  end

  def test_factor_page_returns_200
    get '/codebase'
    assert_equal 200, last_response.status
  end

  def test_unknown_factor_returns_404
    get '/nonexistent-factor'
    assert_equal 404, last_response.status
  end

  def test_rack_version_patched
    version = Gem.loaded_specs['rack'].version
    assert version >= Gem::Version.new('3.2.2'), "rack #{version} is below patched version 3.2.2"
  end
end
