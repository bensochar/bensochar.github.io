---
layout: post
title:  Extending Bootstrap 5 Utitlies
date:   2023-01-03 16:00 -0500
tags:   [CSS, SASS, Bootstrap]
---
[Bootstrap 5](https://getbootstrap.com/) builds on 4's utilties - in a way it's getting closer to Tailwind. With the new utilties API, you can easily add your own or override default ones. This gives you a lot more flexibility & customization while keeping with the pattern of Bootstrap.

It's also a great way to reuse code accross projects.

Create a new file called `_bootstrap_extended.scss` & add the required Bootstrap imports:


```scss
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

Let's add a way to change our background positions. I want to stay with the language that Bootstrap uses around left to right/right to left. So I'm going to use _start_ instead of _left_ & _end_ instead of _right_.

```scss
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

### Using State for interactive styles

If want to change it so it only works on hover we can use the `state` option:

```scss
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

### Reusing Styles

Since these utilites merge into previous ones we can add some styles that would help on other projects. I think these scroll utilites are useful:


```scss
$utilities: map-merge(
  $utilities,
  (
    "overflow-x": (
      property: overflow-x,
      responsive: true,
      values: auto hidden visible scroll,
    ),
    "overflow-y": (
      property: overflow-y,
      responsive: true,
      values: auto hidden visible scroll,
    ),
    "scroll-behavior": (
      property: scroll-behavior,
      class: scroll-behavior,
      responsive: true,
      values: (
        'auto': auto,
        'smooth': smooth
      )
    ),
    "scroll-snap-align": (
      property: scroll-snap-align,
      class: scroll-snap-align,
      responsive: true,
      values: (
        'none': none,
        'start': start,
        'both': start end,
        'center': center,
        'end': end
      )
    ),
    "scroll-snap-type": (
      property: scroll-snap-type,
      class: scroll-snap-type,
      responsive: true,
      values: (
        'none': none,
        'x': x proximity,
        'y': y proximity,
        'block': block,
        'inline': inline,
        'both': both
      )
    )
  )
);

```

As long as we use Bootstrap's varibles we can reuse these utilties on other projects in the future. Here I've added some styles to set dimensions of elements baased on the `$position-values` variable.

```scss
$utilities: map-merge(
  $utilities,
  (
    "min-height": (
      property: min-height,
      class: mnh,
      values: map-merge($position-values, 
        (
        auto: auto,
        none: none,
        )
      )
    ),
    "height": (
      property: height,
      class: h,
      values: map-merge($position-values, 
        (auto: auto)
      )
    ),
    "max-height": (
      property: max-height,
      class: mxh,
      values: map-merge($position-values, 
        (none: none)
      )
    ),
    "min-width": (
      property: min-width,
      class: mnw,
      values: map-merge($position-values, 
        (
        auto: auto,
        none: none,
        )
      )
    ),
    "width": (
      property: width,
      class: w,
      values: map-merge($position-values, (auto: auto))
    ),
    "max-width": (
      property: max-width,
      class: mxw,
      responsive: true,
      values: map-merge($position-values, 
        (none: none)
      )
    )
  )
);
```



