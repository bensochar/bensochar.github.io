---
layout: post
title:  Converting Datetimes to Local & Relative with Vue
date:   2021-01-18 16:00 -0500
tags:   [VueJs, javascript, date-fns, dates]
---
This builds on my [previous post]({% post_url 2021-01-16-removing-friction-by-converting-datetimes-to-local-and-relative-using-rails-and-javascript %}) about implimenting this in Rails. Unlike my other post, this will only use VueJS.

Yarn or NPM [date-fns](https://date-fns.org/). I only needed US format but date-fns supports others. We'll also import realtive formatting & checks for same year/week as the current date so we can cleanup the date.

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

And now our Vue component. We only need 2 props. A date & date format. Both are strings.

```javascript
<template>
  <time class="text-muted transition-all" :data-datevalue="localValue" :data-dateformat="localFormat"></time>
</template>

<script>
  import dateTimeHelper from '../javascripts/dateTimeHelper.js'
  const dateFormats = dateTimeConfig()

  export default {
    name: 'LocalDateTime',
    props: {
      dateValue: {
        type: String,
        required: true
      },
      dateFormat: {
        type: String,
        default: 'iiii, MMM d, yyyy h:mm a z'
      }
    },
    computed: {
      localValue: function () {
        return JSON.stringify(this.dateValue)
      },
      localFormat: function () {
        return this.dateFormat
      }
    },
    mounted () {
      let self = this
      dateTimeHelper(self.$el)
    }
  }
</script>

```

Now we can use our date time component in an Event card:


```javascript

<template v-if="event">
  <div class="card border-0 h-100 position-relative">
    <card-header :title="event.title" :link="event.object_path"></card-header>
    <div class="card-body p-0 border-0">
      <p class="card-text text-muted small">{{ event.excerpt }}</p>      
      <local-date-time :date-value="event.start_date_change_zone"></local-date-time>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      LocalDateTime: () => import('LocalDateTime.vue')
    },
    name: 'EventCard',
    props: {
      event: {
        type: Object,
        required: true
      }
    }
  }
</script>

```