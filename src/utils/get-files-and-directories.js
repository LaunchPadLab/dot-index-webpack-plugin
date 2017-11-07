const fs = require('fs-extra')

function isDirectory (fileName) {
  return !fileName.includes('.')
}

function getFilesAndDirectories (rootPath) {
  const allFiles = fs.readdirSync(rootPath)
  return {
    files: allFiles.filter(file => !isDirectory(file)),
    directories: allFiles.filter(isDirectory)
  }
}

module.exports = getFilesAndDirectories