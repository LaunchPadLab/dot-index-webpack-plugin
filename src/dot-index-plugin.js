const createDotIndexFiles = require('./utils/create-dot-index-files')
const { update } = require('lodash')

function DotIndexPlugin(options = {}) {
  this.options = options
  this.initialized = false
}

// In webpack v4, contextDependencies is a Set
function addContextDependency(compilation, dependency) {
  compilation.contextDependencies.add(dependency)
}

DotIndexPlugin.prototype.apply = function(compiler) {
  const { path: rootPath, ...options } = this.options
  if (!rootPath) throw new Error('DotIndexPlugin requires "path" option')
  // Add root path to contextDependencies
  // This will make webpack watch the entire directory
  compiler.hooks.afterEmit.tapAsync('DotIndexPlugin', (compilation, cb) => {
    addContextDependency(compilation, rootPath)
    cb()
  })
  // Before compilation, build dot index files
  function onRun(_compilation, cb) {
    createDotIndexFiles(rootPath, options)
    cb()
  }
  // Hook into both normal and watch mode
  compiler.hooks.run.tapAsync('DotIndexPlugin', onRun)
  compiler.hooks.watchRun.tapAsync('DotIndexPlugin', onRun)
  // Add .index to mainFiles
  update(compiler, 'options.resolve.mainFiles', (mainFiles = []) => [
    ...mainFiles,
    '.index',
  ])
}

module.exports = DotIndexPlugin
