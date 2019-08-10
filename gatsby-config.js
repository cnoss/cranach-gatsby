/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
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
          '~': resolve('src'),
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
