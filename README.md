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

To use this plugin in your project, add an instance of the plugin to your `plugins` array, with a `path` option value specifying the root of the directory where you'd like your dot index files to be generated.

Example **webpack.config.js**:

```js
const DotIndexPlugin = require('dot-index-webpack-plugin')

module.exports = {
  // ... other configuration ...
  plugins: [
    new DotIndexPlugin({
      // watch src/ folder for changes
      path: path.join(__dirname, '../src'),
    }),
  ],
}
```

## Custom export names

In some cases, you may want to customize the formatting of the generated export names.
In this case, you can pass in a custom `formatExports` function to the plugin constructor:

```js
  plugins: [
    new DotIndexPlugin({
      path: path.join(__dirname, '../src'),
      formatExports: (filename, rootPath) => filename.toUpperCase()
    })
  ],

  // ... will result in ...

  export { default as MYCOMPONENT } from './MyComponent'
```
