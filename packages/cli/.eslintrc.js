const path = require('path');
module.exports = {
  extends: [
    "oclif",
    "oclif-typescript",
    "@rockset"
  ],
  rules: {
    // This rule is being really flaky, and can't be disabled in a file for some reason
    "unicorn/no-abusive-eslint-disable": 0   
  },
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
