const camelcase = require('lodash.camelcase')

function stripExtension (fileName) {
  return fileName.split('.')[0]
}

function isKebabCase (fileName) {
  return fileName.includes('-')
}

function toExportName (fileName) {
  const stripped = stripExtension(fileName)
  return isKebabCase(stripped) ? camelcase(stripped) : stripped
}

function createIndexFileContent (files=[]) {
  let content = `// This index file was auto-generated by dot-index-webpack-plugin.\n// To overwrite it, simply add an index.js file of your own.\n\n`
  files.forEach(file => {
    if (file === '.index.js') return
    content += `export { default as ${ toExportName(file) } } from './${ stripExtension(file) }'\n`
  })
  return content
}

module.exports = createIndexFileContent