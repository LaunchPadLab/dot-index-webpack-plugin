const fs = require('fs-extra')
const path = require('path')
const camelcase = require('lodash.camelcase')

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
    fs.unlinkSync(to('.index.js'))
  } catch (e) {} // eslint-disable-line no-empty
  const { files, directories } = getFilesAndDirectories(rootPath)
  // Create file
  if (!files.includes('index.js')) {
    const indexFileContent = createIndexFileContent(files)
    fs.writeFileSync(to('.index.js'), indexFileContent)
  }
  // Recurse
  directories.forEach(dir => createDotIndexFiles(to(dir)))
}

const isDir = name => name.split('.').length === 1

function getFilesAndDirectories (rootPath) {
  const allFiles = fs.readdirSync(rootPath)
  return {
    files: allFiles.filter(f => !isDir(f)),
    directories: allFiles.filter(isDir)
  }
}

function createIndexFileContent (files) {
  let content = ''
  files.forEach(file => {
    content += `export { default as ${ camelcase(file.split('.')[0]) } } from './${ file.split('.')[0] }'\n`
  })
  return content
}

module.exports = DotIndexGeneratorPlugin