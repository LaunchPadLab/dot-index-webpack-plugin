[![npm version](https://badge.fury.io/js/dot-index-webpack-plugin.svg)](https://badge.fury.io/js/dot-index-webpack-plugin)

# dot-index-webpack-plugin

This plugin automatically builds [dot index files](#dot-index-files) that export the contents of directories. It generates these files each time a file is changed or added to a specified source folder. This relieves you of the need to remember to update your index files each time you add a new file to your project.

## Dot Index Files

Dot index files are identical to index files except in name: the filename `.index.js` rather than `index.js` denotes that they were generated automatically. A dot index file exports all other modules in its directory, using the name of the file as the name of the export. For instance, in a directory with structure:

```
+ src
| - .index.js
| - myModule.js
| - otherModule.js
```

The .index.js file would look like:

```js
export { default as myModule } from './myModule'
export { default as otherModule } from './otherModule'
```

This convention means that it's important that filenames match desired module names. In order to use a custom index file rather than a generated one, simply add a `index.js` in the given directory.

## Usage

To use this plugin in your project, two steps are necessary. First, in your webpack config, add a custom `mainFiles` value to your `resolve` option specifying that `.index.js` files can be used to resolve directories. Secondly, add an instance of the plugin to your `plugins` array, with a `path` option value specifying the root of the directory where you'd like your dot index files to be generated.

Example **webpack.config.js**:

```js

const DotIndexPlugin = require('dot-index-webpack-plugin')

module.exports = {
  entry: [
    ...
  ],
  output: {
    ...
  },
  module: {
    rules: [
      ...
    ]
  },
  resolve: {
    // Fallback to .index files when resolving directories
    mainFiles: ['index', '.index'], 
  },
  plugins: [
    new DotIndexPlugin({
      // watch src/ folder for changes
      path: path.join(__dirname, '../src'),
    })
  ],
}
```

## Limitations

This plugin hijacks the default "watch" functionality in order to watch for newly added files.
This may lead to some strange behavior- in particular, when overwriting a dot index file with an index file, a restart of the compilar may be necessary.

