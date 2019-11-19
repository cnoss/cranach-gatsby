import React, { useState, useEffect } from 'react';

import './leporello.scss';

const Leporello = ({ children }) => (
  <section
    className="leporello"
    data-component="atoms/leporello"
  >
    { children }
  </section>
);

const Item = ({
  children,
  isOpen,
  className = '',
  ...others
}) => {
  const [innerIsOpen, setInnerIsOpen] = useState(isOpen);
  const [additionalClassNames, setAdditionalClassNames] = useState([]);

  useEffect(() => {
    setInnerIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setAdditionalClassNames(
      [
        ...className.split(' '),
        (innerIsOpen ? '-is-open' : ''),
      ],
    );
  }, [className, innerIsOpen]);

  return (
    <section
      className={ `leporello-item ${additionalClassNames.join(' ')}` }
      { ...others }
    >
      { children }
    </section>
  );
};

Leporello.Item = Item;

export default Leporello;
