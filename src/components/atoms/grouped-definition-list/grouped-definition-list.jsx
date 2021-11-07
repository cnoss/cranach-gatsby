import React from 'react';

import './grouped-definition-list.scss';
import HTMLOutput from '~/components/atoms/html-output';

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
    <dt className="grouped-definition-list__term">{ term }</dt>
    <dd className="grouped-definition-list__definition">
      {typeof (definition) === 'string' && <HTMLOutput>{definition}</HTMLOutput>}
      {typeof (definition) !== 'string' && definition}
    </dd>
  </React.Fragment>
);

export default GroupedDefinitionList;
