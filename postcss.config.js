module.exports = {
  plugins: [
    /* eslint-disable global-require */

    require('postcss-import'),
    require('postcss-simple-vars'),
    require('autoprefixer'),

    /* eslint-enable global-require */
  ],
};
