const path = require('path')
const root = process.cwd()
const CustomResolver = require('./custom-resolver')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(root, './src'),
  output: {
    path: path.resolve(root, './build'),
    filename: '[name].js'
  },
  resolve: {
    plugins: [
      new CustomResolver()
    ]
  }
}