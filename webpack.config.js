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
