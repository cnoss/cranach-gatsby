// src/templates/page.js

import React from 'react';
import Helmet from 'react-helmet';

const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;

  return (
    <React.Fragment>
      <Helmet>
        <title>Grafiken - { (graphic.titles[0] && graphic.titles[0].title) || '' }</title>
      </Helmet>
      <h1>{graphic.inventoryNumber}</h1>

      <pre>
        <code>
          { JSON.stringify(graphic, null, 4) }
        </code>
      </pre>
    </React.Fragment>
  );
};
export default PageTemplate;
