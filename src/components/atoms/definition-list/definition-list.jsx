import React from 'react';
import FlatText from '~/components/atoms/flat-text';

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
    <dt className="definition-list__term">{term}</dt>
    <dd className="definition-list__definition">
      {typeof (definition) === 'string' && <FlatText
        text={definition}
      />}
      {typeof (definition) !== 'string' && definition}
    </dd>
  </React.Fragment>
);

export default DefinitionList;
