import React, { useState, useEffect } from 'react';

import './leporello-graphic-item.scss';

import Leporello from '~/components/atoms/leporello';
import Toggler from '~/components/atoms/toggler';


export default ({
  initiallyOpen,
  children,
  className = '',
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

  return (
    <Leporello.Item
      className={ `leporello-graphic-item ${additionalClassNames.join(' ')}` }
      data-component="molecules/leporello-graphic-item"
      isOpen={ isOpen }
      { ...other }
    >
      <div className="toggler-container is-hidden-mobile">
        <Toggler onToggle={ setIsOpen } />
      </div>
      { children }
    </Leporello.Item>
  );
};
