# -*- encoding: utf-8 -*-
# stub: octopress-autoprefixer 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "octopress-autoprefixer"
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Brandon Mathis"]
  s.date = "2015-12-09"
  s.description = "Autoprefixer for Jekyll based sites"
  s.email = ["brandon@imathis.com"]
  s.homepage = "https://github.com/octopress/autoprefixer"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.8"
  s.summary = "Automatically adds CSS vender prefixes for all CSS and Sass files in any Jekyll blog"

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<autoprefixer-rails>, [">= 0"])
      s.add_runtime_dependency(%q<jekyll>, ["~> 3.0"])
      s.add_development_dependency(%q<clash>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<bundler>, ["~> 1.7"])
    else
      s.add_dependency(%q<autoprefixer-rails>, [">= 0"])
      s.add_dependency(%q<jekyll>, ["~> 3.0"])
      s.add_dependency(%q<clash>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<bundler>, ["~> 1.7"])
    end
  else
    s.add_dependency(%q<autoprefixer-rails>, [">= 0"])
    s.add_dependency(%q<jekyll>, ["~> 3.0"])
    s.add_dependency(%q<clash>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<bundler>, ["~> 1.7"])
  end
end
