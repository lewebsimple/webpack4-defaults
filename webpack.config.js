const { resolve } = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.argv.includes('production') ? 'production' : 'development';

module.exports = {

  mode,

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

      // Vue.js
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // CSS / SCSS
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]' },
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: { name: 'images/[name].[ext]' },
      },

      // SVG
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              'babel-loader',
              'vue-svg-loader',
            ],
          },
          {
            loader: 'file-loader',
            options: { name: 'images/[name].[ext]' },
          },
        ],
      },

    ],
  },

  plugins: [

    // Browsersync
    ...(process.env.PROXY_HOST ? [new BrowserSyncPlugin({
      host: 'localhost',
      port: process.env.PROXY_PORT || 3000,
      proxy: process.env.PROXY_HOST,
      notify: false,
      files: ['./**/*.php'],
    })] : []),

    // Clean assets directory
    ...(mode === 'production' ? [new CleanWebpackPlugin()] : []),

    // Extract styles to a single CSS file
    new MiniCssExtractPlugin({ filename: 'css/[name].css', }),

    // Vue.js
    new VueLoaderPlugin(),

  ],

  optimization: {
    // Minimize JS / CSS
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({ extractComments: (astNode, comment) => false }),
    ],
    // Split vendor chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test:  /node_modules\/(.*)\.js/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  },

  // Resolve loaders relative to webpack4-defaults
  resolveLoader: {
    modules: ['node_modules', resolve(__dirname, 'node_modules')],
  },

  devtool: mode === 'development' ? 'source-map' : false,

  performance: { hints: false, maxAssetSize: 8388608 },

  stats: {
    all: false,
    assets: true,
    errors: true,
    warnings: true,
  },

};
