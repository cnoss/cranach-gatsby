import React, { useState, useEffect } from 'react';

import './leporello-graphic-item.scss';

import Leporello from '~/components/atoms/leporello';
import Toggler from '~/components/atoms/toggler';


export default ({
  initiallyOpen,
  children,
  className = '',
  onToggle = () => {},
  visibleToggler = true,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(!!initiallyOpen);
  const [additionalClassNames, setAdditionalClassNames] = useState([]);

  useEffect(() => {
    setAdditionalClassNames(
      [
        ...className.split(' '),
      ],
    );
  }, [className]);

  const handleTogglerEvent = (isToggled) => {
    setIsOpen(isToggled);
    onToggle(isToggled);
  };

  return (
    <Leporello.Item
      className={ `leporello-graphic-item ${additionalClassNames.join(' ')}` }
      data-component="molecules/leporello-graphic-item"
      isOpen={ isOpen }
      { ...other }
    >
      {visibleToggler
        && (<div className="toggler-container is-hidden-mobile">
          <Toggler
            onToggle={ handleTogglerEvent }
            isInitiallyToggled={ isOpen }
          />
        </div>)
      }
      { children }
    </Leporello.Item>
  );
};
