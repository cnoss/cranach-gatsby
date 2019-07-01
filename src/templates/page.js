// src/templates/page.js
import React from 'react';
const PageTemplate = props => {
  const { inventoryNumber = null, paragraphs = null } = props.pageContext;
  console.log(props);
  return (
    <React.Fragment>
      {inventoryNumber && <h1>{inventoryNumber}</h1>}
      {paragraphs &&
        paragraphs.map(para => (
          <div>
            <h2>{para.heading}</h2>
            <p>{para.content}</p>
          </div>
        ))}
    </React.Fragment>
  );
};
export default PageTemplate;