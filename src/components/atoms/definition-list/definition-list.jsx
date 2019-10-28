
import React from 'react';

import './definition-list.scss';

const DefinitionList = ({ children }) => (
  <dl
    className="definition-list"
    data-component="atoms/definition-list"
  >
    { children }
  </dl>
);

DefinitionList.Entry = ({ term, definition }) => (
  <React.Fragment>
    <dt className="term">{ term }</dt>
    <dd className="definition">{ definition }</dd>
  </React.Fragment>
);

export default DefinitionList;
