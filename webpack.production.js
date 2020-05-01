const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyPlugin([
      { from: 'static/favicon.ico' },
      { from: 'static/js/some_package.js', to: 'js' },
    ]),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js',
    },
  }
});
