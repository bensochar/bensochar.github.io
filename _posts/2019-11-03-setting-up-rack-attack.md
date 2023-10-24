---
layout: post
title:  Setting Up Rack Attack in Rails
date:   2021-11-03 16:00 -0500
tags:   [Ruby, Rails]
---
The [Rack Attack](https://github.com/rack/rack-attack) gem is a must have for most projects. It can prevent DDoS attacks, password brute forcing & saves on hosting resources. It's a good way to keep your logs free of script kid nonsense.

First I want to throttle requests _posting_ to /login page so the app can't be brute forced by randomly trying login/passworf combinations:

```ruby
  throttle('logins/ip', limit: 1, period: 20.seconds) do |req|
    req.ip if req.path == '/login' && req.post?
  end

```

Same with the password resets.

```ruby
  throttle('/password-resets/ip', limit: 10, period: 60.seconds) do |req|
    req.ip if req.path == '/password-reset/new' && req.get?
  end

```

Now let's ban those stupid bots that endlessly curl Wordpress/Apache files:

```ruby
  Rack::Attack.blocklist('fail2ban pentesters') do |req|
    # `filter` returns truthy value if request fails, or if it's from a previously banned IP
    # so the request is blocked
    Rack::Attack::Fail2Ban.filter("pentesters-#{req.ip}", maxretry: 0, findtime: 1.minute, bantime: 2.day) do
      # The count for the IP is incremented if the return value is truthy
      CGI.unescape(req.query_string) =~ %r{/etc/passwd} ||
      req.path.include?('wp-admin') ||
      req.path.include?('wp-conten') ||
      req.path.include?('wp-includes') ||
      req.path.include?('wp-json') ||
      req.path.include?('wp-login') ||
      req.path.include?('php.ini') ||
      req.path.include?('PHP') ||
      req.path.include?('httpconfig')
    end
  end
```

Put it all together:

```ruby
# frozen_string_literal: true

class Rack::Attack

  # By default, Rack::Attack uses `Rails.cache` to store requests information.
  # It's configurable as follows -
  # redis_client = Redis.new(url: ENV['REDIS_URL'] ||= 'redis://localhost:6379')
  # Rack::Attack.cache.prefix = 'rate-limit'
  # Rack::Attack.cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(redis_client)

  class Request < ::Rack::Request

    # You many need to specify a method to fetch the correct remote IP address
    # if the web server is behind a load balancer.
    # Not sure we need this for Heroku
    def remote_ip
      @remote_ip ||= (env['HTTP_CF_CONNECTING_IP'] || env['action_dispatch.remote_ip'] || ip).to_s
    end

    def allowed_ip?
      allowed_ips = ['127.0.0.1', '::1']
      allowed_ips.include?(remote_ip)
    end
  end

  # Throttle all requests to root path by IP (40rpm/IP)
  throttle('req/ip', limit: 300, period: 5.minutes) do |req|
    req.ip #unless req.path.start_with?('/assets')
  end

  # Throttle POST requests to /login by IP address
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:logins/ip:#{req.ip}"
  throttle('logins/ip', limit: 1, period: 20.seconds) do |req|
    req.ip if req.path == '/login' && req.post?
  end


  throttle('/password-resets/ip', limit: 10, period: 60.seconds) do |req|
    req.ip if req.path == '/password-reset/new' && req.get?
  end

  # Exponential backoff for all requests to root path
  #
  # Allows 240 requests in ~8 minutes
  #        480 requests in ~1 hour
  #        960 requests in ~8 hours (~2,880 requests/day)
  # (3..5).each do |level|
  #   throttle("req/ip/#{level}", limit: (30 * (2 ** level)), period: (0.9 * (8 ** level)).to_i.seconds) do |req|
  #     req.remote_ip if req.path == "/"
  #   end
  # end

  # Block suspicious requests for '/etc/password' or wordpress specific paths.
  # After 3 blocked requests in 10 minutes, block all requests from that IP for 5 minutes.
  Rack::Attack.blocklist('fail2ban pentesters') do |req|
    # `filter` returns truthy value if request fails, or if it's from a previously banned IP
    # so the request is blocked
    Rack::Attack::Fail2Ban.filter("pentesters-#{req.ip}", maxretry: 0, findtime: 1.minute, bantime: 2.day) do
      # The count for the IP is incremented if the return value is truthy
      CGI.unescape(req.query_string) =~ %r{/etc/passwd} ||
      req.path.include?('wp-admin') ||
      req.path.include?('wp-conten') ||
      req.path.include?('wp-includes') ||
      req.path.include?('wp-json') ||
      req.path.include?('wp-login') ||
      req.path.include?('php.ini') ||
      req.path.include?('PHP') ||
      req.path.include?('httpconfig')
    end
  end

  # Split on a comma with 0 or more spaces after it.
  # E.g. ENV['HEROKU_VARIABLE'] = "foo.com, bar.com"
  # spammers = ["foo.com", "bar.com"]
  # spammers = ENV['HEROKU_VARIABLE'].split(/,\s*/)
  ip_arr = ENV['BLOCKED_IPS'] || ''
  blocked_ips = ip_arr.split(/,\s*/)

  # # Turn spammers array into a regexp
  # spammer_regexp = Regexp.union(spammers) # /foo\.com|bar\.com/
  blocklist('block ips') do |req|
    blocked_ips.include?(req.ip)
  end

  # Do not throttle for allowed IPs
  safelist('allow from localhost') do |req|
    req.allowed_ip?
  end
end

```