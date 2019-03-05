// https://eslint.org/docs/user-guide/configuring
// https://medium.com/@agm1984/how-to-set-up-es-lint-for-airbnb-vue-js-and-vs-code-a5ef5ac671e8
// https://alligator.io/vuejs/vue-eslint-plugin/

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'airbnb-base', // https://github.com/airbnb/javascript
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files (if no vue plugin)
  plugins: [
    // 'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    // allow alias webpack path
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
    // allow debugger and console during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    "no-param-reassign": [2, { "props": false }],
    
    // remove after https://github.com/babel/babel-eslint/issues/530 fix",
    "template-curly-spacing": "off",
    "indent": "off",
  }
}
