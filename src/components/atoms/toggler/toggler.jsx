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

  return <div
      className={ `toggler toggler--${size} ${className} ${toggled ? 'toggler--toggled' : ''}` }
      onClick={ toggle }
      data-component="atoms/toggler"
  >
      <div className="icon-holder">
        <i className="material-icons">expand_more</i>
      </div>
    </div>;
};
