# -*- encoding: utf-8 -*-
# stub: octopress-minify-html 1.3.1 ruby lib

Gem::Specification.new do |s|
  s.name = "octopress-minify-html"
  s.version = "1.3.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Brandon Mathis"]
  s.date = "2016-02-29"
  s.description = "Minify Jekyll's HTML output using html_press"
  s.email = ["brandon@imathis.com"]
  s.homepage = "https://github.com/octopress/minify-html"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.8"
  s.summary = "Minify Jekyll's HTML output using html_press"

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>, ["~> 1.3"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<clash>, [">= 0"])
      s.add_runtime_dependency(%q<jekyll>, [">= 2.0"])
      s.add_runtime_dependency(%q<html_press>, ["~> 0.8"])
      s.add_runtime_dependency(%q<octopress-hooks>, [">= 0"])
      s.add_development_dependency(%q<octopress-debugger>, [">= 0"])
    else
      s.add_dependency(%q<bundler>, ["~> 1.3"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<clash>, [">= 0"])
      s.add_dependency(%q<jekyll>, [">= 2.0"])
      s.add_dependency(%q<html_press>, ["~> 0.8"])
      s.add_dependency(%q<octopress-hooks>, [">= 0"])
      s.add_dependency(%q<octopress-debugger>, [">= 0"])
    end
  else
    s.add_dependency(%q<bundler>, ["~> 1.3"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<clash>, [">= 0"])
    s.add_dependency(%q<jekyll>, [">= 2.0"])
    s.add_dependency(%q<html_press>, ["~> 0.8"])
    s.add_dependency(%q<octopress-hooks>, [">= 0"])
    s.add_dependency(%q<octopress-debugger>, [">= 0"])
  end
end
