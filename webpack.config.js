const { resolve } = require('path');

module.exports = {

  module: {
    rules: [],
  },

  plugins: [],

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
