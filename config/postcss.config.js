// eslint-disable-next-line no-unused-vars
const cssnano = require('cssnano');
const pruneVar = require('postcss-prune-var');
const purgecss = require('@fullhuman/postcss-purgecss');
const purgeHtml = require('purgecss-from-html');
const purgeJs = require('purgecss-from-js');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./**/*.html', './_js/*.js'],
      extractors: [
        {
          extractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          extensions: ['js']
        },
        {
          extractor: purgeHtml,
          extensions: ['html']
        }
      ]
      // content: ['./_site/**/*.html']
    }),
    pruneVar(),
    cssnano({
      preset: ['default', {
        discardComments: {
            removeAll: true,
        },
      }]
    }),
  ]
}