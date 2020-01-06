import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CopyText from '~/components/atoms/copy-text';
import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';


import './leporello-graphic-reprints-item.scss';

export default ({
  reprints,
  className = '',
  onItemClick,
}) => {
  const { t } = useTranslation('LeporelloGraphicReprintsItem');

  /* Number of initial visible reprint items */
  const reprintItemsLimit = 100;
  const hasMoreReprintItemsThanLimit = reprints.length > reprintItemsLimit;

  /* Map reprints */
  const reprintItems = reprints.map((reprintItem) => {
    const item = reprintItem.ref;

    return {
      inventoryNumber: item.inventoryNumber,
      title: item.owner || '',
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.image && item.image.small),
      preventLinkFollowing: true,
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
          <h2 className="chapter">{ t('Reprints') }</h2>
          <h3 className="headline">{ t('First State') }</h3>
          <CopyText
            text={ t('Description') }
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
