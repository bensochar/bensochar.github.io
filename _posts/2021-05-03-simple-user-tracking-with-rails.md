---
layout: post
title: Making a Simple Way to Track User Activity with Rails
date: 2021-05-03 00:00:00 -0500
---
Want to track a User's journey through your app? Follow up on abandoned transaction?

> Still thinking about Reebok Alien Stompers in Red?

We've all seen these emails because they're _very_ effective. You could connect up a bunch 3rd party apps, manaully export data & put into your email client.

For the use case at [Ellevate](https://www.ellevatenetwork.com/) we wanted to use this data to follow up on Users that viewed an Event _but_ didn't buy a ticket. The latter 1/2 is a lot - let's focuse on tracking for now.

We're going to need a new table that contains data about the user & content they viewed so let's fire up the `rails g migration...`

```ruby
class CreateTrackings < ActiveRecord::Migration[5.2]
  def change
    create_table :trackings do |t|
      t.integer :associated_id, null: false
      t.integer :user_id, null: false
      t.string :action, null: false
      t.string :associated_type, null: false
      t.timestamps
    end
  end
end
```

And our model. We want to validate the User
```ruby
# app/models/tracking.rb

class Tracking < ApplicationRecord
  self.table_name = :trackings

  belongs_to :user, class_name: 'User'
  belongs_to :associated, polymorphic: true, optional: true

  validates :user, presence: true
end

```

Our routes for the client side tracking. We'll limit them to the only actions we need & make the response JSON.

```ruby
  # config/routes.rb
  resources :trackings, only: [:new, :create], defaults: { format: :json }
```

We'll need something for our Javascript to read. I could've used url pattern matching to figure out what resource was being viewed... but that would get super messy. Route paths could change. A numerical id might not be in a "pretty url".

So we'll use this helper method:

```ruby
# app/helpers/trackings_helper.rb

module TrackingsHelper
  def set_tracking_object(record = nil)
    obj = {
      action: "#{controller.controller_name} #{controller.action_name}",
    }.merge(
      associated_type: "#{record.class.name}",
      associated_id: "#{record.id}"
    ) if record
    content_for(:tracking_object) { raw(obj.to_json).html_safe }
  end

  def tracking_json
    content_tag :script, content_for(:tracking_object) || raw({ action:"#{controller.controller_name} #{controller.action_name}" }.to_json).html_safe, class: 'js-track-content', type: 'application/json'
  end
end
```

It will output this in a view:


```html
<script class="js-track-content" type="application/json">
  {
    "action":"events show",
    "associated_type":"Events",
    "associated_id":"124"
  }
</script>
```

The controller our Javascript will hit. We want to associate the User with the tracking here so we'll want to double check for one 1st. This also makes sure the User is loaded from the ecrypted cookie.

Note that I entered the _Danger Zone_ by using a reserved word in a controller. But I _really_ wanted it to match Google Analytics so it was easier for the marketing team to understand.

```ruby
# app/controllers/trackings_controller.rb

class TrackingsController < ApplicationController
  before_action :identify_user

  def create
    @tracking = Tracking::Content.new(tracking_params.merge(user_id: identified_user.id, action: set_action))
    if @tracking.save
      render status: :ok, json: @tracking
    else
      render status: :bad_request, json: @tracking.errors.full_messages.join(', ')
    end
  end

  private

  def tracking_params
    params.require(:tracking).permit(
      :associated,
      :associated_id,
      :associated_type,
      :action
    )
  end

  def set_action 
    # 'action' is reserved word in Rails
    if request.method == "POST"
      action = request.request_parameters['action']
    else
      action = request.query_parameters['action']
    end
  end

  def identify_user
    current_user.present? || cookies[:current_user].present?
  end

  def identified_user
    current_user.presence || User.find(cookies.encrypted[:current_user]) if identify_user
  end

end

```

This is how we track using the client side. 

I think it's wise to pull your routes into your javascript instead of hardcoding to prevent breakage in the future. I'm putting the routes I use into an erb file that will compiled in Webpack. But you hard code it.


```javascript
// frontend/src/javascripts/routesConfig.js.erb

'use strict'
export default function routesConfig() {
  const routes = {
    trackings: '<%= Rails.application.routes.url_helpers.trackings_path(format: :json) %>'
  }
  return routes
}
```

This uses Axios but any library will work or you can use `fetch()`

```javascript
// frontend/src/javascripts/trackContent.js

'use strict'
import ax from 'axiosInit.js'
const Url = require('url-parse')

// Prams can be 'action: my-action'
export default function trackContent (paramsObj = {}) {
  // Ignore Admin noise.
  const pathsToIgnore = ['admin']

  // Check for User first
  if (Cookies.get('current_user')) {
    const trackingParamsEle = document.querySelector('.js-track-content')
    const urlObj = new Url(window.location.href, true)
    const routes = routesConfig()
    const trackingPath = routes['trackings']
    // Check for urls to ignore
    const pathsArray = urlObj.pathname.split('/')
    const pathIntersections = pathsArray.filter(e => pathsToIgnore.indexOf(e) !== -1)
    if (trackingParamsEle && (pathIntersections.length < 1)) {

      // Get the tracking data from the HTML element
      const trackingParams = JSON.parse(trackingParamsEle.textContent)
      ax.post(trackingPath, trackingParams)
        .then(function (response) {
        })
        .catch(function (error) {
          // handle error
        })
        .then(function () {})
    }
  }
}

document.addEventListener('turbolinks:load', () => {
  trackContent()
})
```