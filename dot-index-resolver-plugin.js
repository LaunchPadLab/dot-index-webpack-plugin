const fs = require('fs-extra')

function DotIndexResolverPlugin (options={}) {
  this.apply = resolver => apply(resolver, options)
}

function apply (resolver) {
  resolver.plugin('before-existing-directory', (request, callback) => {
    const fileName = useDotIndex(request.path, resolver) ? '.index.js' : 'index.js'
    const newRequest = { 
      ...request,
      path: resolver.join(request.path, fileName),
      relativePath: resolver.join(request.relativePath, fileName)
    }
    return callback(null, newRequest)
  })
}

function useDotIndex (currentPath, resolver) {
  return (
    fs.existsSync(resolver.join(currentPath, '.index.js')) 
    && !fs.existsSync(resolver.join(currentPath, 'index.js'))
  )
}

module.exports = DotIndexResolverPlugin