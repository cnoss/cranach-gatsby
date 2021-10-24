import React from 'react';

import './html-output.scss';

export default ({ children }) => (
  <span
    className="html-output"
    data-component="atoms/html-output"
    dangerouslySetInnerHTML={{ __html: children }}
  >
  </span>
);
