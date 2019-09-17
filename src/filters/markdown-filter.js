const markdownItAnchor = require('markdown-it-anchor');
const markdownIt = require('markdown-it')().use(markdownItAnchor);

module.exports = function markdown(value) {
  return markdownIt.render(value);
};
