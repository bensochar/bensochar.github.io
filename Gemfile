source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
# Auto redirect pages
gem 'jekyll-redirect-from'
gem 'jekyll-mentions'
# JSON
gem 'json'

group :development, :test do
end

group :site do
  if ENV["PROOF"]
    gem "html-proofer", "~> 2.0"
  end
  gem "jekyll-sitemap"
end