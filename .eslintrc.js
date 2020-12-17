module.exports = {
  extends: 'eslint-config-egg/typescript',
  // panpm runrser: 'babel-eslint',
  parserOptions: {
    // recommend to use another config file like tsconfig.eslint.json and extends tsconfig.json in it.
    // because you may be need to lint test/**/*.test.ts but no need to emit to js.
    // @see https://github.com/typescript-eslint/typescript-eslint/issues/890
    project: './tsconfig.json',
    sourceType: 'module',
    typeScript: true,
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    // see https://github.com/eslint/eslint/issues/6274
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': 'off',
    semi: 'off',
    '@typescript-eslint/no-this-alias': 'off',
  },
}
