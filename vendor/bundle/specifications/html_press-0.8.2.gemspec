# -*- encoding: utf-8 -*-
# stub: html_press 0.8.2 ruby lib

Gem::Specification.new do |s|
  s.name = "html_press"
  s.version = "0.8.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["stereobooster"]
  s.date = "2013-06-04"
  s.description = "Ruby gem for compressing html"
  s.email = ["stereobooster@gmail.com"]
  s.homepage = "https://github.com/stereobooster/html_press"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.8"
  s.summary = "Compress html"

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rspec>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_runtime_dependency(%q<multi_css>, [">= 0.1.0"])
      s.add_runtime_dependency(%q<multi_js>, [">= 0.1.0"])
      s.add_runtime_dependency(%q<htmlentities>, [">= 0"])
    else
      s.add_dependency(%q<rspec>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<multi_css>, [">= 0.1.0"])
      s.add_dependency(%q<multi_js>, [">= 0.1.0"])
      s.add_dependency(%q<htmlentities>, [">= 0"])
    end
  else
    s.add_dependency(%q<rspec>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<multi_css>, [">= 0.1.0"])
    s.add_dependency(%q<multi_js>, [">= 0.1.0"])
    s.add_dependency(%q<htmlentities>, [">= 0"])
  end
end
