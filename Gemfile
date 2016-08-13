source 'https://rubygems.org'
group :jekyll_plugins do
  gem 'github-pages'
  gem 'octopress-image-tag'
  gem 'octopress-minify-html'
  gem 'octopress-social'
end
gem 'octopress-autoprefixer'
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