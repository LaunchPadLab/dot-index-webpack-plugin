const webpack = require('webpack')
const path = require('path')
const { DotIndexResolverPlugin, DotIndexGeneratorPlugin } = require('../../src')
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
      plugins: [
        new DotIndexResolverPlugin()
      ]
    },
    plugins: [
      new DotIndexGeneratorPlugin({ path: to('./test-input') })
    ]
  }

  webpack(config, (err, stats) => {
    expect(err).toEqual(null)
    const modules = stats.toJson().modules
    expect(modules.length).toEqual(3)
    const indexSource = modules[0].source
    expect(indexSource).toEqual('export { default as myComponent } from \'./MyComponent\'\nexport { default as myFunction } from \'./myFunction\'\n')
    end()
  })
})

afterAll(() => {
  fs.removeSync(to('./test-input/.index.js'))
  fs.removeSync(to('./test-output'))
})