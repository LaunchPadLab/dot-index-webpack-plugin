const { camelCase } = require('lodash')

function stripExtension (fileName) {
  return fileName.split('.')[0]
}

function isKebabCase (fileName) {
  return fileName.includes('-')
}

function defaultFormatExports (fileName, rootPath) {
  return isKebabCase(fileName) ? camelCase(fileName) : fileName
}

function createIndexFileContent (files=[], rootPath, { formatExports=defaultFormatExports }={}) {
  let content = `// This index file was auto-generated by dot-index-webpack-plugin.\n// To overwrite it, simply add an index.js file of your own.\n\n`
  files.forEach(file => {
    if (file === '.index.js') return
    const strippedFileName = stripExtension(file)
    content += `export { default as ${ formatExports(strippedFileName, rootPath) } } from './${ strippedFileName }'\n`
  })
  return content
}

module.exports = createIndexFileContent