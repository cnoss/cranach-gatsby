import React, { useState, useEffect } from 'react';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import './leporello-graphic-reprints-item.scss';

export default ({
  graphic,
  className = '',
}) => {
  /* Number of initial visible reprint items */
  const reprintItemsLimit = 4;
  const hasMoreReprintItemsThanLimit = graphic.references.length > reprintItemsLimit;

  /* Map reprints */
  const reprintItems = graphic.references.map((reprintItem) => {
    const item = reprintItem.ref;

    return {
      title: item.owner || '',
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.image && item.image.small),
    };
  });

  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [limitReprintItems, setLimitedReprintItems] = useState(!isOpen);

  /* React on addtional classnames changes */
  useEffect(() => {
    setAdditionalClassNames([
      ...className.split(' '),
    ]);
  }, [className, isOpen]);

  /* React on open / close toggle */
  useEffect(() => {
    setLimitedReprintItems(!isOpen);
  }, [isOpen]);

  return (
    <LeporelloGraphicItem
      className={ `leporello-graphic-reprints-item ${additionalClassNames.join(' ')}` }
      data-component="organisms/leporello-graphic-reprints-item"
      initiallyOpen={ isOpen }
      onToggle={ setIsOpen }
      visibleToggler={ hasMoreReprintItemsThanLimit }
    >
      <div className="columns">
        <div className="column is-one-quarter intro">
          <h1 className="title">1. Zustand</h1>
          <p className="description">
            Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen,
            gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße.
          </p>
        </div>

        <div className="column reprints-list">
          <h2 className="title">Abzüge</h2>
          <GraphicsList
            items={
              limitReprintItems
                ? reprintItems.slice(0, reprintItemsLimit)
                : reprintItems
            }
          />
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
