const
  postcss = require('postcss'),
  tailwind = require('tailwindcss'),
  purgecss = require('@fullhuman/postcss-purgecss'),
  cssnano = require('cssnano'),
  cssimport = require('postcss-import')

module.exports = {
  plugins: [
    cssimport,
    tailwind,
    ...process.env.NODE_ENV === 'production' ? [
      purgecss({
        content: ['src/_includes/**/*.njk'],
        css: ['src/_includes/assets/css/tailwind.css'],
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