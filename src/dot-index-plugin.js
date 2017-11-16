const path  = require('path')
const { createMonitor } = require('watch')
const createDotIndexFiles = require('./utils/create-dot-index-files')

function DotIndexPlugin (options={}) {
  this.options = options
  this.initialized = false
}

DotIndexPlugin.prototype.apply = function (compiler) {
  const rootPath = this.options.path
  if (!rootPath) throw new Error('DotIndexGeneratorPlugin requires "path" option')
  function recompile () {
    createDotIndexFiles(rootPath)
    return compiler.run(() => {})
  }
  compiler.plugin('watch-run', (compilation, callback) => {
    createDotIndexFiles(rootPath)
    // Only initialize once
    if (this.initialized) return callback()
    createMonitor(rootPath, monitor => {
      monitor.files[path.join(rootPath, '*.js')]
      monitor.on('created', recompile)
      monitor.on('removed', recompile)
      this.initialized = true
      callback()
    })
  })
}

module.exports = DotIndexPlugin
