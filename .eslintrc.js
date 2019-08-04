
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@components': resolve('src/components'),
              '@pages': resolve('src/pages'),
              '@styles': resolve('src/pages'),
              '@templates': resolve('src/templates'),
            },
            extensions: [
              '.js',
              '.css',
              '.scss',
              '.json',
            ],
          },
        },
      },
      /*
      alias: {
        map: [
          [ '@components', resolve('src/components') ],
        ],
        extensions: [
          'js',
          'css',
          'scss',
          'json',
        ],
      },
      */
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
};
