const path = require('path')
const root = process.cwd()
const DotIndexResolverPlugin = require('./dot-index-resolver-plugin')
const DotIndexGeneratorPlugin = require('./dot-index-generator-plugin')

module.exports = {
  entry: path.resolve(root, './src'),
  output: {
    path: path.resolve(root, './build'),
    filename: '[name].js'
  },
  resolve: {
    plugins: [
      new DotIndexResolverPlugin()
    ]
  },
  plugins: [
    new DotIndexGeneratorPlugin({
      path: path.join(__dirname, 'src')
    })
  ]
}