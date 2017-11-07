module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'jest': true,
  },
  'parser': 'babel-eslint',
  'ecmaFeatures': {
    'experimentalObjectRestSpread': true,
  },
  'extends': [
    'eslint:recommended',
  ],
  'rules': {
    'no-console': [
      'warn',
    ],
    'no-unused-vars': [
      'warn',
    ],
  },
}