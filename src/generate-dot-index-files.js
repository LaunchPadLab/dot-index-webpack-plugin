#!/usr/bin/env node

const createDotIndexFiles = require('./utils/create-dot-index-files')

function main (args=process.argv.slice(2)) {
  const rootPath = args[0]
  if (!rootPath) throw new Error('Must provide "path" argument')
    // console.log(rootPath)
  return createDotIndexFiles(rootPath)
}

module.exports = main

if (!module.parent) main()
