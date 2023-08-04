---
layout: post
title:  "Handling 3rd Party Service Rate Limits with Sidekiq & ActiveJob"
date:   20-07-14 14:00 -0500
tags:   [Ruby, Rails, Sidekiq, ActiveJob]
---
Working with Sendgrid we found we hit rate limits very quickly on their marketing & validation endpoints. Since validating emails & updating contact fields isn't super critical we could keep retrying. 

Here's an example job: 

```ruby
# frozen_string_literal: true

class MySlowJob < ApplicationJob
  RateLimitExceeded = Class.new(StandardError)

  queue_as :default
  sidekiq_options retry: 10, backtrace: 10

  retry_on RateLimitExceeded, wait: rand(10..240).minutes

  def perform(user_id)
    User.uncached do
      user = User.find(user_id)
      # Call the service that hits the API:
      response = MySlowService.new(user).perform
      # Responses can vary depending on the service
      raise(RateLimitExceeded) if response.headers['x-ratelimit-remaining'].to_i < 2
    end
  rescue ActiveRecord::RecordNotFound
    true
  end
end

```