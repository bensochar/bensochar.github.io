---
layout: post
title:  Removing Friction by Converting Datetimes to Local & Relative Useing Rails & Javascript
date:   2021-01-16 16:00 -0500
tags:   [rails, javascript, date-fns, dates]
---
Lets pretend We're in LA & looking at an online event in NYC that takes place on Jan 24 at 6:30pm. We see this date:

Saturday, Jan 24 6:30 PM EDT

Now you've got to figure if you can go - how far ahead is NY?, Is today Friday?. We can remove some friction by making the dates nicer. Like these:

Today at 3:30 PM PST
Tomorrow at 3:30 PM PST
Saturday at 3:30 PM PST

Basecamp had a gem that did this but it hasn't been maintained in years. So we'll make our own with a helper & some javascript.

This method uses javascript to localize a datetime client side so we reduce DB calls & makes views easier to cache.

When we're done, we'll have this HTML:


```html
<time class="js-local-time transition-all" datetime="2021-01-16T18:30:00-04:00" data-dateformat="iiii, MMM d, yyyy h:mm a z" data-datevalue="&quot;2021-01-16T18:30:00-04:00&quot;">Today at 6:30 PM EDT</time>
```

You'll need to update your time format config file. Or add it if you don't have it - it makes life so much easier. We need a format that [date-fns](https://date-fns.org/) can parse that will match dates parsed with Ruby.


```ruby
# config/initializers/time_formats.rb

Date::DATE_FORMATS[:event_time] = '%A, %b %e %l:%M %p %Z' # Monday, Jan 1 12:00 PM EDT
Time::DATE_FORMATS[:event_time] = '%A, %b %e %l:%M %p %Z' # Monday, Jan 1 12:00 PM EDT

Date::DATE_FORMATS[:event_date_js] = 'iiii, MMM d, yyyy h:mm a z' 
Time::DATE_FORMATS[:event_time_js] = 'iiii, MMM d, yyyy h:mm a z'
```

We'll add a helper. The CSS classes & "spinner" are optional. I thought it make someone crazy if they see a date change a split second after navigating. We'll pull in our Date format from our config, convert it to iso8601 & to JSON. We can use data attributes on the time element to modify the output.

```ruby
# app/helpers/date_time_helper.rb

module DateTimeHelper
  def format_date_time_to_local(content, time, format = Date::DATE_FORMATS[:event_date_js])
    spinner = spinner_border('text-muted spinner-border-sm ms-1')
    content_tag(
      :time,
      class: 'js-local-time text-muted transition-all',
      datetime: time.iso8601,
      data: { 
        dateformat: format, 
        datevalue: time.iso8601.to_json
      }
    ) do 
      content.concat(spinner).html_safe
    end
  end
end
```

Yarn or NPM date-fns](https://date-fns.org/). I only needed US format but date-fns supports others. We'll also import realtive formatting & checks for same year/week as the current date so we can cleanup the date.

There's the optonal removal of the "text-muted" styles once the formatting is complete.


```javascript
// frontend/src/javascripts/dateTimeHelper.js

'use strict'
export const supportedLocales = ['en-US']
import { format } from 'date-fns-tz'
import { isValid, formatRelative, isThisWeek, isThisYear, getDay } from 'date-fns'

export default function dateTimeHelper (ele) {
  let str = ''
  const nowDate = new Date()
  const eleData = ele.dataset
  let dateFormat = eleData.dateformat
  const dateVal = Date.parse(JSON.parse(eleData.datevalue))

  // We don't need to know the year if it's the same as the current year
  let dateFormatWithYear = function(format) {
    if (isThisYear(dateVal)) {
      return dateFormat.replace('yyyy', '')
    } else {
      return format
    }
  }

  if (isValid(dateVal)) {
    const offsetWeekDay = getDay(nowDate)
    // We can drop the day of the week if it's the same as the current week
    if (isThisWeek(dateVal, { weekStartsOn: offsetWeekDay })) {
      let realtiveStr = formatRelative(dateVal, nowDate, { weekStartsOn: offsetWeekDay }) + ' ' + format(dateVal, 'z')
      str = realtiveStr.replace(/^\w/, (c) => c.toUpperCase())

    } else {
      str = format(dateVal, dateFormatWithYear(dateFormat))
    }
    ele.textContent = str
    ele.classList.remove('text-muted')
  } else {
    ele.classList.remove('text-muted')
  }
}

document.addEventListener('turbolinks:load', () => {
  const eles = document.querySelectorAll('.js-local-time')
  Array.prototype.forEach.call(eles, function(ele) {
    dateTimeHelper(ele)
  })
})
```