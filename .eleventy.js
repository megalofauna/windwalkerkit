const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const pluginTOC = require('eleventy-plugin-nesting-toc');


// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const parseTransform = require('./src/transforms/parse-transform.js');

// Import data files
const site = require('./src/_data/site.json');

module.exports = function (config) {
  // Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('markdownFilter', markdownFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Layout aliases
  config.addLayoutAlias('home', 'layouts/home.njk');

  // Transforms
  config.addTransform('htmlmin', htmlMinTransform);
  config.addTransform('parse', parseTransform);

  // Passthrough copy
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/svg');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/admin/config.yml');
  config.addPassthroughCopy('src/admin/previews.js');
  config.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');

  // Shortcodes
  config.addPairedShortcode("fill", function (content, value) {
    return `<div class="-ml-${value} -mr-${value}">
        <div class="w-full px-${value}">${content}</div>
      </div>`;
  });

  const now = new Date();

  // Custom collections
  const livePosts = post => post.date <= now && !post.data.draft;
  config.addCollection('posts', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
    ].reverse();
  });

  config.addCollection('postFeed', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, site.maxPostsPerPage);
  });

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginTOC, {
    tags: ['h2']
  });

  // Markdown
  const markdownIt = require('markdown-it')
  const markdownItAnchor = require("markdown-it-anchor");
  const options = {
    html: true,
    breaks: true,
    linkify: true
  };
  const opts = {
    permalink: true,
    slugify: function (s) {
      let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, '');
      newStr = newStr.replace(/⚠️/g, '');
      newStr = newStr.replace(/[?!]/g, '');
      return encodeURIComponent(newStr.trim().toLowerCase().replace(/\s+/g, '-'));
    },
    permalinkBefore: false,
    permalinkClass: "direct-link",
    permalinkSymbol: "",
    level: [1, 2, 3, 4]
  };

  config.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};