import React, { useState } from 'react';

import './toggler.scss';

export default ({ isInitiallyToggled, onToggle }) => {
  const [toggled, setToggled] = useState(!!isInitiallyToggled);

  const toggle = () => {
    setToggled(!toggled);

    if (onToggle && onToggle instanceof Function) {
      onToggle(!toggled);
    }
  };

  return <div
      className={ `toggler ${toggled ? '-is-toggled' : ''}` }
      onClick={ toggle }
      data-component="atoms/toggler"
    >
    </div>;
};
