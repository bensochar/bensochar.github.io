---
layout: post
title:  Extending Bootstrap 5 Utitlies
date:   2021-01-03 16:00 -0500
tags:   [CSS, Bootstrap]
---
[Bootstrap 5](https://getbootstrap.com/) builds on 4's utilties but now you can easily add your own. 

Create a new file called `_bootstrap_extended.scss` & add the required Bootstrap imports:


```ruby
# import the required files
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables'; # This should be your localized varibles file.
@import 'bootstrap/scss/utilities';

$utilities: map-merge(
  $utilities,
  (
    # styles go here
  )
);

```

Here's what we can do with them. Let's add a way to change our background positions:

```ruby
# import the required files
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables'; # This should be your localized varibles file.
@import 'bootstrap/scss/utilities';

$utilities: map-merge(
  $utilities,
  (
    'bg-position': (
      property: background-position, # the CSS property
      class: bg-position, # the class name we use in HTML
      responsive: true,
      values: (
        'top': top,
        'end': right,
        'bottom': bottom,
        'start': left,
        'center': center,
        'inherit': inherit
      )
    )
  )
);

```

Now we can use `bg-position-center` to center a background image. And since we added `responsive: true` we can align the image to the left on large screens by using the class `bg-position-lg-start`.

If want to change it so it only works on hover we can use the `state` option:

```ruby
# import the required files
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables'; # This should be your localized varibles file.
@import 'bootstrap/scss/utilities';

$utilities: map-merge(
  $utilities,
  (
    'bg-position': (
      property: background-position, # the CSS property
      class: bg-position, # the class name we use in HTML
      state: hover,
      values: (
        'top': top,
        'end': right,
        'bottom': bottom,
        'start': left,
        'center': center,
        'inherit': inherit
      )
    )
  )
);

```

So if we add `bg-position-center-hover` to an element the image will only center on hover.