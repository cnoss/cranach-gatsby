const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-page-js": hot(preferDefault(require("/Users/jorge/DEV/th-koeln/cranach/repos/cranach-gatsby/src/templates/page.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/jorge/DEV/th-koeln/cranach/repos/cranach-gatsby/.cache/dev-404-page.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("/Users/jorge/DEV/th-koeln/cranach/repos/cranach-gatsby/src/pages/about.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/jorge/DEV/th-koeln/cranach/repos/cranach-gatsby/src/pages/index.js")))
}

