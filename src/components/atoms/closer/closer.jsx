import React from 'react';

import './closer.scss';

export default ({ onClose }) => (
  <div
      className="closer"
      onClick={ onClose }
      data-component="atoms/closer"
    ><i className="material-icons">close</i></div>
);
