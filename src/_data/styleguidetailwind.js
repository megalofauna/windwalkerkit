const tokens = require('../../tailwind.config');

module.exports = {
  primaries() {
    let response = [];

    Object.keys(tokens.theme.colors.primary).forEach(key => {
      response.push({
        value: tokens.theme.colors.primary[key],
        key
      });
    });

    return response;
  },
  neutrals() {
    let response = [];

    Object.keys(tokens.theme.colors.neutral).forEach(key => {
      response.push({
        value: tokens.theme.colors.neutral[key],
        key
      });
    });

    return response;
  },
  backgrounds() {
    let response = [];

    Object.keys(tokens.theme.skin.background).forEach(key => {
      response.push({
        value: tokens.theme.skin.background[key],
        key
      });
    });

    return response;
  },
};
