module.exports = {
    plugins: [
      'prettier',
      'eslint-plugin-prettier',
      'sonarjs'
    ],
    extends: [
      'prettier',
      'plugin:sonarjs/recommended'
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: [
      '.eslintrc.js',
      'dist',
      'node_modules'
    ],
    rules: {
      'prettier/prettier': 'error',
      'max-len': [
        'warn',
        {
          'code': 120,
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true,
          'ignoreComments': true
        }
      ],
      'object-curly-spacing': ['warn', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always']
    },
  };