import React, { useState, useEffect } from 'react';

import CopyText from '~/components/atoms/copy-text';
import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import './leporello-graphic-reprints-item.scss';

export default ({
  reprints,
  className = '',
  onItemClick,
  limitItemsTo = 100,
  title = '',
  subtitle = '',
  description = '',
}) => {
  /* Number of initial visible reprint items */
  const reprintItemsLimit = limitItemsTo;
  const hasMoreReprintItemsThanLimit = reprints.length > reprintItemsLimit;

  /* Map reprints */
  const reprintItems = reprints.map((reprintItem) => {
    const item = reprintItem.ref;

    return {
      inventoryNumber: item.inventoryNumber,
      title: item.owner || '',
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
      preventLinkFollowing: true,
    };
  });

  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [limitReprintItems, setLimitReprintItems] = useState(!isOpen);

  /* React on additional classnames changes */
  useEffect(() => {
    setAdditionalClassNames([
      ...className.split(' '),
    ]);
  }, [className, isOpen]);

  /* React on open / close toggle */
  useEffect(() => {
    setLimitReprintItems(!isOpen);
  }, [isOpen]);

  const innerHandleItemClick = (item) => {
    const foundSelectedItem = reprints.find(
      refItem => refItem.inventoryNumber === item.inventoryNumber,
    );

    if (foundSelectedItem && (typeof onItemClick) === 'function') {
      onItemClick(foundSelectedItem.ref);
    }
  };

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
          <h2 className="chapter">{title}</h2>
          <h3 className="headline">{subtitle}</h3>
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
            onItemClick={ innerHandleItemClick }
          />
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
