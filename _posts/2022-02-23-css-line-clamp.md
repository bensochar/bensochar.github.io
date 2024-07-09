---
layout: post
title:  CSS Line Clamp Utility
date:   2022-02-23 00:52:21 -0500
tags:   [CSS, SASS, Bootstrap, snippet]
---


```sass
  .line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
```

If we're using Bootstrap we can [extend it as a utility]({% post_url 2022-01-03-extending-bootstrap-5-utllities %}) to set the number of lines we want.

```ruby
# import the required files
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables'; # This should be your localized varibles file.
@import 'bootstrap/scss/utilities';

$utilities: map-merge(
  $utilities,
  (
    "line-clamp": (
      property: -webkit-line-clamp,
      class: line-clamp,
      values: (
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        unset: 'unset'
      )
    )
  )
);

```