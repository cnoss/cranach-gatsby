import React, { useState, useEffect } from 'react';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import './leporello-graphic-related-works-item.scss';

export default ({
  className = '',
}) => {
  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  /* React on additional classnames change and open / close toggle */
  useEffect(() => {
    setAdditionalClassNames([
      ...className.split(' '),
      /*
        We add an extra classname, if the leporello item was opened,
        to be able to react to it on style level
      */
      ...(isOpen ? ['-related-works-is-open'] : []),
    ]);
  }, [className, isOpen]);

  return (
    <LeporelloGraphicItem
      className={ `leporello-graphic-related-works-item ${additionalClassNames.join(' ')}` }
      data-component="organisms/leporello-graphic-related-works-item"
      initiallyOpen={ isOpen }
      onToggle={ setIsOpen }
    >
      <div className="columns">
        <div className="column is-one-quarter intro">
          <p className="description">
            Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte,
            fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.
            Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten,
            als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper
            dehnte.
          </p>
        </div>

        <div className="column">
          <GraphicsList items={ [] } />
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
