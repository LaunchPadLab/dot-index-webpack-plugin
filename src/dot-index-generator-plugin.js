const createDotIndexFiles = require('./utils/create-dot-index-files')

function DotIndexGeneratorPlugin (options={}) {
  this.apply = compiler => apply(compiler, options)
}

function apply (compiler, { path: rootPath }) {
  if (!rootPath) throw new Error('DotIndexGeneratorPlugin requires "path" option')
  compiler.plugin('before-compile', (params, callback) => {
    createDotIndexFiles(rootPath)
    return callback(null, params)
  })
}

module.exports = DotIndexGeneratorPlugin