const
  cssimport = require('postcss-import'),
  advancedvars = require('postcss-advanced-variables'),
  color = require('postcss-color-function'),
  nested = require('postcss-nested'),
  tailwind = require('tailwindcss'),
  purgecss = require('@fullhuman/postcss-purgecss'),
  cssnano = require('cssnano'),
  calc = require('postcss-calc'),
  extend = require('postcss-extend');

module.exports = {
  plugins: [
    cssimport,
    tailwind,
    extend,
    calc,
    nested,
    advancedvars,
    ...process.env.NODE_ENV === 'production' ? [
      purgecss({
        content: ['src/**/*.njk'],
        css: ['src/_includes/assets/css/site.css'],
        whitelist: ['js-mode-toggle', 'js-mode-status', 'js-mode-text'],
        extractors: [{
          extractor: class {
            static extract(content) {
              return content.match(/[\w-/:]+(?<!:)/g) || []
            }
          },
          extensions: ['njk']
        }]
      }),
      cssnano
    ] : [],
  ]
}