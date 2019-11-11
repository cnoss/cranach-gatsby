import React, { useState } from 'react';

import './toggler.scss';

export default ({ onToggle }) => {
  const [toggled, setToggled] = useState(false);

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
