# -*- encoding: utf-8 -*-
# stub: octopress-social 1.4.5 ruby lib

Gem::Specification.new do |s|
  s.name = "octopress-social"
  s.version = "1.4.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Brandon Mathis"]
  s.date = "2015-05-17"
  s.email = ["brandon@imathis.com"]
  s.homepage = "http://github.com/octopress/social"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.8"
  s.summary = "Easy social network integration for Jekyll sites"

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll>, [">= 2.0"])
      s.add_development_dependency(%q<bundler>, ["~> 1.7"])
      s.add_development_dependency(%q<rake>, ["~> 10.0"])
      s.add_development_dependency(%q<clash>, [">= 0"])
      s.add_development_dependency(%q<octopress-debugger>, [">= 0"])
    else
      s.add_dependency(%q<jekyll>, [">= 2.0"])
      s.add_dependency(%q<bundler>, ["~> 1.7"])
      s.add_dependency(%q<rake>, ["~> 10.0"])
      s.add_dependency(%q<clash>, [">= 0"])
      s.add_dependency(%q<octopress-debugger>, [">= 0"])
    end
  else
    s.add_dependency(%q<jekyll>, [">= 2.0"])
    s.add_dependency(%q<bundler>, ["~> 1.7"])
    s.add_dependency(%q<rake>, ["~> 10.0"])
    s.add_dependency(%q<clash>, [">= 0"])
    s.add_dependency(%q<octopress-debugger>, [">= 0"])
  end
end
