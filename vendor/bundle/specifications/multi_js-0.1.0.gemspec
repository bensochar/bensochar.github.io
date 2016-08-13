# -*- encoding: utf-8 -*-
# stub: multi_js 0.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "multi_js"
  s.version = "0.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["sterebooster"]
  s.date = "2013-06-04"
  s.description = "A generic swappable back-end for JS minifiers"
  s.email = ["stereobooster@gmail.com"]
  s.homepage = "https://github.com/stereobooster/multi_js"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.8"
  s.summary = "A generic swappable back-end for JS minifiers"

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<uglifier>, ["~> 2"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rdoc>, [">= 0"])
      s.add_development_dependency(%q<rspec>, [">= 0"])
      s.add_development_dependency(%q<simplecov>, [">= 0"])
    else
      s.add_dependency(%q<uglifier>, ["~> 2"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rdoc>, [">= 0"])
      s.add_dependency(%q<rspec>, [">= 0"])
      s.add_dependency(%q<simplecov>, [">= 0"])
    end
  else
    s.add_dependency(%q<uglifier>, ["~> 2"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rdoc>, [">= 0"])
    s.add_dependency(%q<rspec>, [">= 0"])
    s.add_dependency(%q<simplecov>, [">= 0"])
  end
end
