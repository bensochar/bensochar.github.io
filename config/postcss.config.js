// eslint-disable-next-line no-unused-vars
const cssnano = require('cssnano');
const pruneVar = require('postcss-prune-var');
const purgecss = require('@fullhuman/postcss-purgecss');
const purgeHtml = require('purgecss-from-html');
const purgeJs = require('purgecss-from-js');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    require('autoprefixer')({
      flexbox: "no-2009"
    }),
    purgecss({
      content: ['./_includes/*.html', 
        './_includes/svgs/*.svg',
        '_config.yml',
        './_layouts/*.html', 
        './_src/template/*.html', 
        './_site/**/*.html',
        './_js/*.js'],
      extractors: [
        {
          extractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          extensions: ['js']
        },
        {
          extractor: purgeHtml,
          extensions: ['html']
        }
      ],
      safelist: [/^highlight$/,
        'align-top',
        'h-100',
        'mx-lg-n5',
        'mxw-none',
        'p-3',
        'p-lg-5',
        'w-100',
        'w-auto',
        'mb-0']
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