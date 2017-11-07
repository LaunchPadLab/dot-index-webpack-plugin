const fs = require('fs-extra')
const path = require('path')
const createIndexFileContent = require('./create-index-file-content')
const getFilesAndDirectories = require('./get-files-and-directories')

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

module.exports = createDotIndexFiles