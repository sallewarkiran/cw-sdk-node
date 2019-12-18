module.exports = {
  plugins: ['prettier', 'import', 'jest'],
  env: {
    amd: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import', 'jest'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      extends: [
        'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/interface-name-prefix': 'off'
      },
      env: {
        amd: true,
        node: true
      },
      settings: {
        'import/resolver': {
          typescript: {
            directory: './'
          }
        }
      }
    }
  ]
};
