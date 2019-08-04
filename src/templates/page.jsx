// src/templates/page.js

import React from 'react';

const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;

  return (
    <React.Fragment>
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
