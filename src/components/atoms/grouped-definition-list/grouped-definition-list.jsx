
import React from 'react';

import './grouped-definition-list.scss';

const GroupedDefinitionList = ({ children }) => (
  <dl
    className="grouped-definition-list"
    data-component="atoms/grouped-definition-list"
  >
    { children }
  </dl>
);

GroupedDefinitionList.Entry = ({ term, definition }) => (
  <React.Fragment>
    <dt className="grouped-definition-list-term">{ term }</dt>
    <dd className="grouped-definition-list-definition">{ definition }</dd>
  </React.Fragment>
);

export default GroupedDefinitionList;
