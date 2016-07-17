---
layout: post
title:  "SASS Anchor Offset Mixin"
date:   2016-07-14 00:52:21 -0500
categories: sass mixins snippet
---
Fixed navigation can be problematic on sites when linking to anchors. The window will scroll the anchored element to the top of the window covering the content. I've seen a lot of javscript that fixes this, but I think its problimatic since:

1. The javascript has to wait for the DOM to render then scroll the window
2. On touch devices its possible the user scrolls before the javscript kicks in and moves the viewpoint away from intended content

We can use CSS to retain browser behavior & increase the UX. Here is my SASS/CSS solution:

```sass
@mixin anchor-offset($offset, $padding-top:false) {
  border-top: $offset solid transparent;
  margin-top: -$offset;

  // Contain the elements background color/image
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;

  // This is the clearfix
  zoom: 1;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }

  // We can substitute padding top for the margin top we will be replacing
  @if $padding-top {
    padding-top: $padding-top;
  }
}
```

The Codepen is here: [http://codepen.io/bensochar/pen/kXZWGz](http://codepen.io/bensochar/pen/kXZWGz)