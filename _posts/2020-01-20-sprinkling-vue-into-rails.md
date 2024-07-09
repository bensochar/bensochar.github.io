---
layout: post
title:  Sprinkling Vue into Rails
date:   2020-01-20 01:00 -0500
tags:   [VueJs, javascript, Rails, Ruby, Webpack, Webpacker]
---
One of very few downsides of Rails is getting a reactive UI like we se in JS apps. 

Using Vue in Rails can be great when you've got something like a real-time dashboard, a view with a lot of assocations or new user acquistion. But sharing data from the Rails app can be a pain.

We can include Vue but we want a few things to make our lives easier:

1. Load a Vue instance into an erb view
1. Be able to share variables from the Rails apps as Props so nothing is hardcoded into JS
1. Use the 18n localization files in Vue
1. Have Vue play nice with Turbolinks

Let's pretend our blogging app has articles we want loaded async. And we want to pass 3 things from Rails to Vue. A url to load the Articles, an optional CSS style & some copy from our 18n files. 

This our erb file. We're going to pass the 3 varibles with data attributes.

```ruby
<h2><%= t('.articles.header') %></h2>
<div class="js-articles-card-deck" 
  data-cta="<%= t('.articles.cta') %>"
  data-rowstyle="row-cols-lg-3"
  data-url="<%= articles_path(page: 1, per_page: 6, format: :json) %>"></div>

```

JS that will call Vue. You'll want to install [vue-turbolinks](https://www.npmjs.com/package/vue-turbolinks). Otherwise your Vue apps will keep remounting when a user hits the back button.

```javascript
// app/javascripts/src/ArticleCardDeck.vue
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue'
Vue.use(TurbolinksAdapter)

export default function articleCardDecks (selector = '.js-articles-card-deck') {
  // Find all the card decks
  const eles = document.querySelectorAll(selector)
  if (eles.length > 0) {
    const articleCardDeck = () => import('ArticleCardDeck.vue')
    // Calling Vue on each one
    Array.prototype.forEach.call(eles, function(ele) {
      new Vue({ 
        el: ele,
        render: h => h(articleCardDeck, {
          props: {
            cta: ele.dataset.cta,
            rowStyle: ele.dataset.rowstyle,
            url: ele.dataset.url
          }
        })
      })
    })
  }
}

document.addEventListener('turbolinks:load', () => {
  articleCardDecks()
})
```

The Vue template with the 3 props we're passing. Since the row style is HTML code we'll need to bind it. 

```javascript
// app/javascripts/src/components/ArticleCardDeck.vue
<template>
  <div class="row row-cols-1 row-cols-sm-2 g-5 flex-nowrap overflow-x-auto" 
    v-if="loaded" 
    v-bind:class="rowStyle">
    <div v-for="article in articles" 
      :key="article.id" 
      class="col">
      <article-card :article="article"></article-card>
    </div>
    <p class="col-12 text-muted"
    v-if="articles.length == 0 && loaded">No Articles</p>
  </div>
  <spinner v-else></spinner>
  <p class="col-12">{{cta}}</p>
</template>

<script>
  import ax from '../javascripts/axiosInit.js'

  export default {
    name: 'ArticleCardDeck',
    components: {
      ArticleCard: () => import('ArticleCard.vue'),
      Spinner: () => import('Spinner.vue')
    },
    data: () => ({
      articles: [],
      loaded: false
    }),
    props: {
      cta: {
        type: String,
        required: true,
      },
      rowStyle: {
        type: String,
        required: false,
        default: ''
      },
      url: {
        type: String,
        required: true
      }
    },
    created () {
      let self = this
      ax.get(self.url)
        .then(function (response) {
          self.articles = response.data
        })
        .catch(function (error) {
          // handle an error
        })
        .then(function () {
          self.loaded = true
        })
    }
  }
</script>
```

Going further you can pass an 18n node as an object to Vue for rednering something like a list or pass along some images.To do that we'd need to change a couple of things.

1st pass the 18n & asset as JSON objects.

```ruby
<h2><%= t('.articles.header') %></h2>
<div class="js-articles-card-deck"
  data-assetsobj="<%= { 
    my_articles_image: { 
      url: image_url('my_articles_image.svg'), 
      width: 50, 
      height: 50, 
      alt: 'Some articles' 
    },
  }.to_json %>">
  data-ctaobj="<%= I18n.t('.articles.cta').to_json %>"
  data-rowstyle="row-cols-lg-3"
  data-url="<%= articles_path(page: 1, per_page: 6, format: :json) %>"></div>

```
Then adjust your props & template so you can work with objects. 

```javascript
// app/javascripts/src/components/ArticleCardDeck.vue
<template>
  <figure class="figure" v-for="asset in assetObj">
    <img class="img-fluid"
      :src="asset.url"
      :width="asset.width"
      :height="asset.height"
      :alt="asset.alt">
  </figure>
  <div class="row row-cols-1 row-cols-sm-2 g-5 flex-nowrap overflow-x-auto" 
    v-if="loaded" 
    v-bind:class="rowStyle">
    <div v-for="article in articles" 
      :key="article.id" 
      class="col">
      <article-card :article="article"></article-card>
    </div>
    <p class="col-12 text-muted" 
      v-if="articles.length == 0 && loaded">No Articles</p>
  </div>
  <spinner v-else></spinner>
  <ul>
    <li v-for="item in ctaObj" 
      v-html="item"></li>
  </ul>
</template>

<script>
  import ax from '../javascripts/axiosInit.js'

  export default {
    name: 'ArticleCardDeck',
    components: {
      ArticleCard: () => import('ArticleCard.vue'),
      Spinner: () => import('Spinner.vue')
    },
    data: () => ({
      articles: [],
      loaded: false
    }),
    props: {
      assetObj: {
        type: Object,
        required: true
      },
      ctaObj: {
        type: Object,
        required: true
      },
      rowStyle: {
        type: String,
        required: false,
        default: ''
      },
      url: {
        type: String,
        required: true
      }
    },
    created () {
      let self = this
      ax.get(self.url)
        .then(function (response) {
          self.articles = response.data
        })
        .catch(function (error) {
          // handle an error
        })
        .then(function () {
          self.loaded = true
        })
    }
  }
</script>
```
