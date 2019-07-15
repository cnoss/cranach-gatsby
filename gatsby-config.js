/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-transformer-json`, {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `./content/`
      }
    },
  ],
}