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
  // backgrounds() {
  //   let response = [];
  //     response.push(tokens.theme.colors.neutral)
  //     response.push({
  //       value: `bg-${tokens.theme.skin.background}`,
  //       key
  //   })
  //   return response;
  // },
  // backgrounds() {
  //   console.log("Heyo!")
  // }
};
