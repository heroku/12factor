require 'sinatra'
require 'maruku'
require 'i18n'
require 'rack/ssl-enforcer'

configure do
  use Rack::SslEnforcer if ENV['FORCE_SSL']
  I18n.enforce_available_locales = true
  I18n.load_path = Dir[File.join(File.dirname(__FILE__), 'locales', '*.yml')]
  I18n.backend.load_translations
  I18n.default_locale = :en
end

before do
  I18n.locale = I18n.default_locale
  if request.host == 'www.12factor.com'
    redirect request.url.sub("//www.", "//"), 301
  end

  if ENV['PASSWORD']
    unless session[:authorized]
      @error_message = nil
      unless params[:password] == ENV['PASSWORD']
        unless request.path == '/login' || request.path == '/favicon.ico'
          session[:original_path] = request.path
        end
        @error_message = 'Please enter the password to continue.' if params[:password]
        halt erb(:login, layout: false)
      end
      session[:authorized] = true
    end
  end
end

enable :sessions

before '/:locale/*' do
  locale = params[:locale].to_sym
  if locale != I18n.default_locale && I18n.available_locales.include?(locale)
    I18n.locale = locale
    request.path_info = '/' + params[:splat][0]
  end
end


post '/login' do
  if params[:password] == ENV['PASSWORD']
    session[:authorized] = true
    redirect session[:original_path] || '/'
  else
    @error_message = 'Incorrect password, please try again.'
    erb :login, layout: false
  end
end

get '/' do
  erb :home
end

get '/blog' do
  erb :blog
end

get '/community' do
  erb :community
end

TOC = %w(codebase dependencies config backing-services build-release-run processes port-binding concurrency disposability dev-prod-parity logs admin-processes)



POSTS = %w(open-source-announcement narrow-conduits december-monthly-updates evolving-twelve-factor)
get '/blog/:post' do |post|
  halt 404 unless POSTS.include?(post)
  @post = post
  erb :post
end

MAIN_PATHS = %w(/ /blog /community)
# Generate XML Sitemap
get '/sitemap.xml' do
  content_type 'application/xml'

  # Generate the sitemap XML
  builder do |xml|
    xml.instruct! :xml, version: "1.0", encoding: "UTF-8"
    xml.urlset xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do

      # Generate URLs for each main path
      MAIN_PATHS.each do |path|
        I18n.available_locales.each do |locale|
          loc = locale == I18n.default_locale ? path : "/#{locale}#{path}"
          xml.url do
            xml.loc URI.join(request.base_url, loc).to_s
            xml.lastmod Time.now.strftime("%Y-%m-%d")
            xml.changefreq 'weekly'
            xml.priority '0.8'
          end
        end
      end

      # Generate URLs for each Twelve-Factor topic
      TOC.each do |factor|
        I18n.available_locales.each do |locale|
          loc = locale == I18n.default_locale ? "/#{factor}" : "/#{locale}/#{factor}"
          xml.url do
            xml.loc URI.join(request.base_url, loc).to_s
            xml.lastmod Time.now.strftime("%Y-%m-%d")
            xml.changefreq 'monthly'
            xml.priority '0.6'
          end
        end
      end

      # Generate URLs for each blog post
      POSTS.each do |post|
        I18n.available_locales.each do |locale|
          loc = locale == I18n.default_locale ? "/blog/#{post}" : "/#{locale}/blog/#{post}"
          xml.url do
            xml.loc URI.join(request.base_url, loc).to_s
            xml.lastmod Time.now.strftime("%Y-%m-%d")
            xml.changefreq 'monthly'
            xml.priority '0.7'
          end
        end
      end
    end
  end
end

get '/:factor' do |factor|
  halt 404 unless TOC.include?(factor)
  @factor = factor
  erb :factor

end
helpers do
  def alternate_links
    links = [
      "<link rel=\"alternate\" hreflang=\"x-default\" href=\"#{default_url}\">"
    ]

    links += I18n.available_locales.map do |locale|
      href = locale == I18n.default_locale ? default_url : locale_url(locale)
      "<link rel=\"alternate\" hreflang=\"#{locale}\" href=\"#{href}\">"
    end

    links.join("\n")
  end

  def default_url
    uri = URI(request.url)
    uri.query = nil
    uri.path = request.path_info
    uri.to_s
  end

  def locale_url(locale)
    uri = URI(request.url)
    uri.query = nil
    uri.path = "/#{locale}#{request.path_info}"
    uri.to_s
  end

  def render_markdown(file)
    markdown = File.read("content/#{I18n.locale}/#{file}.md", :encoding => 'utf-8')
    Maruku.new(markdown).to_html
  rescue Errno::ENOENT
    puts "No content for #{I18n.locale}/#{file}, skipping"
  end

  def render_post(file)
    markdown = File.read("blog/#{file}.md", :encoding => 'utf-8')
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
