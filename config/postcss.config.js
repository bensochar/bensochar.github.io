// eslint-disable-next-line no-unused-vars
// module.exports = ({ file, options, env }) => ({
//   parser: 'postcss-scss',
//   plugins: {
//     'postcss-import': {},
//     autoprefixer: {},
//     cssnano: env === 'production' ? {} : false,
//   },
// });



const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const pruneVar = require('postcss-prune-var');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./**/*.html']
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