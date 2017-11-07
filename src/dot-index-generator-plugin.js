const fs = require('fs-extra')
const path = require('path')
const createIndexFileContent = require('./utils/create-index-file-content')
const getFilesAndDirectories = require('./utils/get-files-and-directories')

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

function createDotIndexFiles (rootPath) {
  const to = relPath => path.join(rootPath, relPath)
  // Delete .index.js if it exists
  try {
    fs.removeSync(to('.index.js'))
  } catch (e) {} // eslint-disable-line no-empty
  const { files, directories } = getFilesAndDirectories(rootPath)
  // Create file
  if (!files.includes('index.js')) {
    const indexFileContent = createIndexFileContent([ ...files, ...directories ])
    fs.writeFileSync(to('.index.js'), indexFileContent)
  }
  // Recurse
  directories.forEach(dir => createDotIndexFiles(to(dir)))
}

module.exports = DotIndexGeneratorPlugin