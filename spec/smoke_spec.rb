# 12factor.net smoke test -- verifies the Sinatra app boots and serves
# its core routes without raising. Layer L4 of the verification ladder.
#
# Asserts (boot-only; CVE-floor regressions belong in L7, separately):
#   1. Loading web.rb does not raise (Sinatra/rack/i18n init succeeds)
#   2. GET / returns 200 with HTML body containing the Twelve-Factor brand
#   3. GET /ja/ returns 200 (localized path; exercises i18n routing)
#   4. The app responds to a non-existent path with 404 (not 500)
#   5. Rack and Sinatra both load at meaningful versions (sanity check
#      that no-op gem bumps haven't accidentally downgraded the stack)
#
# These assertions catch the regressions most likely from a Ruby gem
# bump (rack, sinatra, rack-session, i18n): require-time errors,
# middleware-stack misconfig, route compile failures. CVE-specific
# version floors are a separate concern (per-fix L7 regression tests
# documented in the relevant PRs).

require 'rack'

RSpec.describe '12factor smoke -- Sinatra app boot' do
  describe 'app loads' do
    it 'web.rb required without error during spec_helper load' do
      # If we got here, spec_helper loaded web.rb successfully.
      expect(defined?(Sinatra::Application)).to eq('constant')
    end
  end

  describe 'GET /' do
    before { get '/' }

    it 'returns HTTP 200' do
      expect(last_response.status).to eq(200)
    end

    it 'returns an HTML body referencing Twelve-Factor' do
      expect(last_response.body).to include('Twelve-Factor')
    end
  end

  describe 'GET /ja/' do
    before { get '/ja/' }

    it 'returns HTTP 200 (localized path -- i18n routing alive)' do
      expect(last_response.status).to eq(200)
    end
  end

  describe 'GET /__nonexistent__' do
    before { get '/__nonexistent__' }

    it 'returns 404, not 500' do
      expect(last_response.status).to eq(404)
    end
  end

  describe 'core stack loads at meaningful versions' do
    it 'Rack is at version 3.x or higher' do
      # Sanity check, not a CVE floor. CVE-floor assertions belong in
      # L7 regression tests on the specific fix PR, not the smoke.
      expect(Gem::Version.new(Rack.release)).to be >= Gem::Version.new('3.0.0')
    end

    it 'Sinatra is loaded' do
      expect(defined?(Sinatra::VERSION)).to eq('constant')
      expect(Gem::Version.new(Sinatra::VERSION)).to be >= Gem::Version.new('3.0.0')
    end
  end
end
