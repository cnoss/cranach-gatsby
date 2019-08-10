/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path');
const sass = require('sass');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
      },
    },
    'gatsby-transformer-json', {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './content/',
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': resolve('src/components'),
          '@pages': resolve('src/pages'),
          '@styles': resolve('src/styles'),
          '@templates': resolve('src/templates'),
        },
        extensions: [
          'js',
          'jsx',
          'css',
          'scss',
          'json',
        ],
      },
    },
  ],
};
