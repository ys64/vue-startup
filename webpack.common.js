const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    'js/app': './src/index.js',
    'css/app.css': './src/scss/app.scss',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader'],
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        // loader: 'file-loader?name=[name].[ext]',
        use: {
          loader: "url-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin(), // remove comments and compress
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      chunks: ['js/app', 'css/app.css'],
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]',
    }),
    new VueLoaderPlugin(),
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
};
