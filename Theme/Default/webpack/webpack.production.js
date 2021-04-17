const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const path = require("path")
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new PurgecssPlugin({
      safelist: function() {
        return {
          standard: ['block--', /^block--/],
          deep: [/^block--/],
          greedy: [/^block--/]
        }
      },
      paths: glob.sync( path.resolve(__dirname + '/../../../../linotype', 'Block/**/*'),  { nodir: true }),
    }),
  ]
})
