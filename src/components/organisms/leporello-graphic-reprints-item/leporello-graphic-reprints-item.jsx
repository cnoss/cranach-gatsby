import React, { useState, useEffect } from 'react';

import CopyText from '~/components/atoms/copy-text';
import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';


import './leporello-graphic-reprints-item.scss';

export default ({
  graphic,
  description = '          Hier wäre es gut, wenn wir den Text dynmaisch aus einer Datei ziehen könnten, in der so ein paar Helpertexte und die Headlines drin sind. (zweisprachig)',
  className = '',
}) => {
  /* Number of initial visible reprint items */
  const reprintItemsLimit = 1;
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
      className={`leporello-graphic-reprints-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-graphic-reprints-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={hasMoreReprintItemsThanLimit}
    >
      <div className="leporello-graphic-reprints-item">
        <div className="leporello-graphic-reprints-item-intro">
          <h2 className="chapter">Abzüge</h2>
          <h3 className="headline">1. Zustand</h3>
          <CopyText
            text={description}
          />
        </div>
        <div className="leporello-graphic-reprints-item-list">
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
