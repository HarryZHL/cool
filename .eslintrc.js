module.exports = {
  root: true,
  extends: ['standard'],
  // 'prettier',
  plugins: ['standard'], // , 'prettier'
  rules: {
    eqeqeq: ['off'],
    'no-callback-literal': ['off']
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  },
  globals: {
    pdfjsLib: true,
    pdfjsViewer: true,
    self: true
  }
}
