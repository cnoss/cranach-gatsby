import React from 'react';

import './btn.scss';

export default ({
  className,
  children,
  click = () => {},
}) => (
  <button
    className={ `btn ${className}` }
    data-component="atoms/btn"
    onClick={ click }
  >
    { children }
  </button>
);
