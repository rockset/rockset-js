const path = require('path');
module.exports = {
  extends: [
    "oclif",
    "oclif-typescript",
    "@rockset"
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
