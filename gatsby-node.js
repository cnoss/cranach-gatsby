// gatsby-node.js
const path = require(`path`);
const fs = require('fs');
exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const pageData = JSON.parse(fs.readFileSync('./content/deVirtual.json', { encoding: 'utf-8' }));
  const blogPostTemplate = path.resolve(`src/templates/page.js`);
  pageData.forEach(page => {
    createPage({
      path: page.inventoryNumber,
      component: blogPostTemplate,
      context: {
        ...page,
      },
    });
  });
};