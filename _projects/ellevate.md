---
index: 0
client: Ellevate
favorite: 1
live_site: https://www.ellevatenetwork.com
title: Ellevate
role: Technical Lead
tags: [SASS, JavaScript, Ruby, Ruby on Rails, RVM, Webpack, erb, Sidekiq, PostgreSQL, Heroku, Redis, Clockwork, Google Analytics, Google Search Console, Hirefire, Zoom API, Vimeo API, rspec, Trello, Vue, Angular, Fastly, Sendgrid APIs, RackAttack, Puma, Hirefire, Rails Autoscale. Papertraill, Scout APM, Google Sign In, ReCaptcha, Bootstrap, Faker, FactoryBot, Active Storage, Paperclip, SimpleForm, Geocoder, Google Geocoding API, Google Places API, DateFNS, Stripe REST API, Stripe Elements, PostgreSQL, Codeship, CI, Github, Git, Airbrake]
---
Ellevate is a professional netowork for women. Primarliy an events platform, it has _many_ other features. Part social network, part CMS, localized Chapters, a B2B side & several levels of access based on roles. This required a custom admin, payemnts as subscription, point of sale & _lots_ of ways to communicate with members. 

6 Years leading development is alot to cover. So...

* Performance. I inherited an old app that would regularly timeout & sometimes crash. I implimented several things:
  * Sidekiq to offload long-running tasks to background jobs.
  * Redis caching.
  * Vue components to pull in content on pages with _lots_ of associations.
  * Scout APM to find slow endpoints.
  * Eliminating n+1 queries.
  * PurgeCSS & Critical CSS setup in Webpack.
  * Chunking Vue components so they load remotely.
* Managment. Leading a team required some changes.
  * Rubocop and AirBnB styleguide.
  * Webpack to build a modern from end.
  * Migrating from a custom CSS framework to Bootstrap.
  * Codeship for our CI.
* Just a few new Features.
  * Squads. Uses an algorithm to put users into groups based on their chosen date/time, career stage, goals & location (either by chapter or lat/lon).
  * Real time messeaging system.
  * Free trial - we migrated away from an application process.
  * Reverse trial. A free trail with a payemnt required up front.
  * Seemless signup/upgrade flows written in Vue so they can exsist in a modal. 
