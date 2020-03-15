import React, { useState } from 'react';

import './toggler.scss';

export default ({
  isInitiallyToggled,
  onToggle,
  className = '',
  size = 'medium',
}) => {
  const [toggled, setToggled] = useState(!!isInitiallyToggled);

  const toggle = () => {
    setToggled(!toggled);

    if (onToggle && onToggle instanceof Function) {
      onToggle(!toggled);
    }
  };

  return <span
      className={ `toggler -${size} ${className} ${toggled ? '-is-toggled' : ''}` }
      onClick={ toggle }
      data-component="atoms/toggler"
    >
      <span className="chevron-container">
        <span className="chevron" />
      </span>
    </span>;
};
