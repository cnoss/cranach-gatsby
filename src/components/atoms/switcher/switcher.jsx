import React from 'react';

import './switcher.scss';

const Switcher = ({
  children,
  className = '',
}) => (
  <ul
    className={ `switcher ${className}` }
    data-component="atoms/switcher"
  >
    { children }
  </ul>
);

Switcher.Item = ({
  children,
  className = '',
}) => (
  <li
    className={ `switcher-item ${className}` }
  >
    { children }
  </li>
);

export default Switcher;
