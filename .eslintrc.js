
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    node: true,
  },
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'react-app',
    'airbnb-base',
  ],
  overrides: [
    {
      files: [
        'src/*.js',
        'src/*.jsx',
      ],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {},
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': resolve('src'),
            },
            extensions: [
              '.js',
              '.jsx',
              '.css',
              '.scss',
              '.json',
            ],
          },
        },
      },
    },
  },
  rules: {
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
  },
};
