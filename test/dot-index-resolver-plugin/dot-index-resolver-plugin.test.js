const webpack = require('webpack')
const path = require('path')
const { DotIndexResolverPlugin } = require('../../src')
const fs = require('fs-extra')

const to = relPath => path.resolve(__dirname, relPath)

test('Resolves .index files', end => {
  
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
  }

  // Expect folder with .index file to be included in modules
  webpack(config, (err, stats) => {
    expect(err).toEqual(null)
    const modules = stats.toJson().modules
    expect(modules.length).toBe(2)
    end()
  })
})

afterAll(() => {
  fs.removeSync(to('./test-output'))
})