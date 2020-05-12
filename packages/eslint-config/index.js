module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'dot-notation': 2,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-empty-function': 0,
    'react/prop-types': 0,
    'react/jsx-key': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
  },
  overrides: [
    {
      files: ['*.hooks.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/camelcase': 2,
        '@typescript-eslint/class-name-casing': 2,
        '@typescript-eslint/require-await': 2,
      },
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser'
};
