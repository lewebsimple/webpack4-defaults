const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  module: {
    rules: [

      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]' },
      },

      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: { name: 'images/[name].[ext]' },
      },

    ],
  },

  plugins: [

    // Clean assets directory
    new CleanWebpackPlugin()

  ],

  // Resolve loaders relative to webpack4-defaults
  resolveLoader: {
    modules: ['node_modules', resolve(__dirname, 'node_modules')]
  },

  performance: { hints: false },

  stats: {
    all: false,
    assets: true,
    errors: true,
    warnings: true,
  },

};
