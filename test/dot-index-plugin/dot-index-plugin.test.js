const webpack = require('webpack')
const path = require('path')
const DotIndexPlugin = require('../../src')
const fs = require('fs-extra')

const to = relPath => path.resolve(__dirname, relPath)

test('Generates dot index files', end => {
  const config = {
    mode: 'production',
    entry: to('./test-input'),
    output: {
      path: to('./test-output'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new DotIndexPlugin({ path: to('./test-input') })
    ],
  }

  webpack(config, (err, stats) => {
    expect(err).toEqual(null)
    const modules = stats.toJson({ source: true }).modules
    expect(modules.length).toEqual(4)
    const indexFileContent = modules.find((module) => module.name.includes('.index.js')).source
    expect(indexFileContent).toMatchSnapshot()
    end()
  })

})

test('Accepts formatExports argument', end => {
  const toUpperCase = filename => filename.replace(/-/g, '').toUpperCase()
  const config = {
    mode: 'production',
    entry: to('./test-input'),
    output: {
      path: to('./test-output'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new DotIndexPlugin({ path: to('./test-input'), formatExports: toUpperCase })
    ]
  }

  webpack(config, (err, stats) => {
    expect(err).toEqual(null)
    const modules = stats.toJson({ source: true }).modules
    expect(modules.length).toEqual(4)
    const indexFileContent = modules.find((module) => module.name.includes('.index.js')).source
    expect(indexFileContent).toMatchSnapshot()
    end()
  })

})

afterEach(() => {
  fs.removeSync(to('./test-input/.index.js'))
  fs.removeSync(to('./test-output'))
})