const webpack = require('webpack')
const path = require('path')
const DotIndexPlugin = require('../../src')
const fs = require('fs-extra')

const to = relPath => path.resolve(__dirname, relPath)

test('Generates dot index files', end => {
  
  const config = {
    entry: to('./test-input'),
    output: {
      path: to('./test-output'),
      filename: '[name].js'
    },
    resolve: {
      mainFiles: ['index', '.index'],
    },
    plugins: [
      new DotIndexPlugin({ path: to('./test-input') })
    ]
  }

  webpack(config, (err, stats) => {
    expect(err).toEqual(null)
    const modules = stats.toJson().modules
    expect(modules.length).toEqual(4)
    const indexFileContent = modules[0].source
    expect(indexFileContent).toMatchSnapshot()
    end()
  })

})

afterAll(() => {
  fs.removeSync(to('./test-input/.index.js'))
  fs.removeSync(to('./test-output'))
})