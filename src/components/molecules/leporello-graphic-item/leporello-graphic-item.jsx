import React, { useState, useEffect } from 'react';

import './leporello-graphic-item.scss';

import Leporello from '~/components/atoms/leporello';
import Toggler from '~/components/atoms/toggler';
import Closer from '~/components/atoms/closer';

export default ({
  initiallyOpen,
  children,
  className = '',
  closerType,
  onToggle = () => { },
  visibleToggler = false,
  onClose = () => { },
  visibleCloser = false,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(!!initiallyOpen);
  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  const closerClass = (closerType) ? `unfold-container--${closerType}` : '';

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
      className={`leporello-graphic-item ${additionalClassNames.join(' ')}`}
      data-component="molecules/leporello-graphic-item"
      isOpen={isOpen}
      {...other}
    >
      <div className="controls-container">
        {visibleCloser
          && (
            <Closer
              onClose={onClose}
            />
          )
        }
      </div>
      {children}

      {visibleToggler
        && (
        <div className={`unfold-container ${closerClass}`}>
            <Toggler
              onToggle={handleTogglerEvent}
            isInitiallyToggled={isOpen}
            className="toogler--right"
            />
          </div>
        )
      }

    </Leporello.Item>
  );
};
