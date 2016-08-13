# -*- encoding: utf-8 -*-
# stub: css_press 0.3.2 ruby lib

Gem::Specification.new do |s|
  s.name = "css_press"
  s.version = "0.3.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["stereobooster"]
  s.date = "2012-08-06"
  s.description = "Ruby gem for compressing CSS"
  s.email = ["stereobooster@gmail.com"]
  s.homepage = ""
  s.rubyforge_project = "css_press"
  s.rubygems_version = "2.4.8"
  s.summary = "Compress CSS"

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<csspool-st>, ["= 3.1.2"])
      s.add_runtime_dependency(%q<json>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rspec>, [">= 0"])
    else
      s.add_dependency(%q<csspool-st>, ["= 3.1.2"])
      s.add_dependency(%q<json>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rspec>, [">= 0"])
    end
  else
    s.add_dependency(%q<csspool-st>, ["= 3.1.2"])
    s.add_dependency(%q<json>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rspec>, [">= 0"])
  end
end
