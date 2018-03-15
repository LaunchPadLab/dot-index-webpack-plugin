const path  = require('path')
const { createMonitor } = require('watch')
const createDotIndexFiles = require('./utils/create-dot-index-files')

function DotIndexPlugin (options={}) {
  this.options = options
  this.initialized = false
}

DotIndexPlugin.prototype.apply = function (compiler) {
  const rootPath = this.options.path
  if (!rootPath) throw new Error('DotIndexPlugin requires "path" option')
  function recompile () {
    return compiler.run(() => {})
  }
  compiler.hooks.watchRun.tapAsync('DotIndexPlugin', (compilation, callback) => {
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
  compiler.hooks.run.tapAsync('DotIndexPlugin', (compilation, callback) => {
    createDotIndexFiles(rootPath)
    callback()
  })
}

module.exports = DotIndexPlugin
