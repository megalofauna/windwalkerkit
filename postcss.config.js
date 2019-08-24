const
  cssimport = require('postcss-import'),
  advancedvars = require('postcss-advanced-variables'),
  color = require('postcss-color-function'),
  nested = require('postcss-nested'),
  tailwind = require('tailwindcss'),
  purgecss = require('@fullhuman/postcss-purgecss'),
  cssnano = require('cssnano'),
  cssmath = require('math-calc');

module.exports = {
  plugins: [
    cssimport,
    tailwind,
    nested,
    advancedvars,
    cssmath,
    ...process.env.NODE_ENV === 'production' ? [
      purgecss({
        content: ['src/_includes/**/*.njk'],
        css: ['src/_includes/assets/css/site.css'],
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