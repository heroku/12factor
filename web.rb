require 'sinatra'
require 'maruku'
require 'i18n'
require 'rack/ssl-enforcer'

configure do
  use Rack::SslEnforcer if ENV['FORCE_SSL']
  I18n.enforce_available_locales = true
  I18n.load_path = Dir[File.join(settings.root, 'locales', '*.yml')]
  I18n.backend.load_translations
  I18n.default_locale = :en
end

before do
  I18n.locale = I18n.default_locale
end

before '/:locale/*' do
  locale = params[:locale].to_sym
  if locale != I18n.default_locale && I18n.available_locales.include?(locale)
    I18n.locale = locale
    request.path_info = '/' + params[:splat][0]
  end
end

get '/' do
  erb :home
end

TOC = %w(codebase dependencies config backing-services build-release-run processes port-binding concurrency disposability dev-prod-parity logs admin-processes)

get '/:factor' do |factor|
  halt 404 unless TOC.include?(factor)
  @factor = factor
  erb :factor
end

helpers do
  def render_markdown(file)
    markdown = File.read("content/#{I18n.locale}/#{file}.md", :encoding => 'utf-8')
    Maruku.new(markdown).to_html
  rescue Errno::ENOENT
    puts "No content for #{I18n.locale}/#{file}, skipping"
  end

  def render_prev(factor)
    idx = TOC.index(factor)
    return if idx == 0
    "<a href=\"./#{TOC[idx-1]}\">&laquo; Previous</a>"
  end

  def render_next(factor)
    idx = TOC.index(factor)
    return if idx == TOC.size-1
    "<a href=\"./#{TOC[idx+1]}\">Next &raquo;</a>"
  end

  def render_locales(factor)
    I18n.available_locales.map {|locale|
      if locale == I18n.locale
        "<span>#{I18n.t(:language)}</span>"
      else
        path_prefix = locale == I18n.default_locale ? "" : "/#{locale}"
        "<a href=\"#{path_prefix}/#{factor}\">#{I18n.t(:language, :locale => locale)}</a>"
      end
    }.join(" | ")
  end
end

not_found do
  "Page not found"
end
