const path = require('path')
const generateDotIndexFiles = require('../../src/generate-dot-index-files')
const fs = require('fs-extra')

const to = relPath => path.resolve(__dirname, relPath)

test('Requires path argument', () => {
  expect(() => generateDotIndexFiles()).toThrow()
})

test('Generates dot index file correctly', () => {
  generateDotIndexFiles([ to('./test-input') ])
  expect(fs.existsSync(to('./test-input/.index.js'))).toEqual(true)
  const indexFileContent = fs.readFileSync(to('./test-input/.index.js')).toString()
  expect(indexFileContent).toMatchSnapshot()
})

afterAll(() => {
  fs.removeSync(to('./test-input/.index.js'))
})
