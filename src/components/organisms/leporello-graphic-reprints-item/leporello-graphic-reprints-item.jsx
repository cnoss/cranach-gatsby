import React, { useState, useEffect } from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import translations from './translations.json';
import './leporello-graphic-reprints-item.scss';

export default ({
  reprints,
  className = '',
  onItemClick = () => {},
  limitItemsTo = 5,
}) => {
  const { t } = useTranslation('LeporelloGraphicReprintsItem', translations);

  /* Map reprints */
  const reprintItems = reprints.map((reprintItem) => {
    const item = reprintItem.ref;

    return {
      inventoryNumber: item.inventoryNumber,
      title: [item.dating.dated, ', ', item.owner],
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
      preventLinkFollowing: true,
      conditionLevel: item.conditionLevel,
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

  const expectedReprintConditionLevelGroups = [
    {
      id: '1st-state',
      translations: {
        title: 'Impressions',
        subtitle: '1st state',
        description: '1st state description',
      },
      filter: reprintRefItem => reprintRefItem && [0, 1].includes(reprintRefItem.conditionLevel),
      items: [],
    },
    {
      id: '2nd-state',
      translations: {
        title: 'Impressions',
        subtitle: '2nd state',
        description: '2nd state description',
      },
      filter: reprintRefItem => reprintRefItem && reprintRefItem.conditionLevel === 2,
      items: [],
    },
    {
      id: '3rd-state',
      translations: {
        title: 'Impressions',
        subtitle: '3rd state',
        description: '3rd state description',
      },
      filter: reprintRefItem => reprintRefItem && reprintRefItem.conditionLevel === 3,
      items: [],
    },
  ];

  const reprintConditionLevelGroups = expectedReprintConditionLevelGroups.map(
    conditionLevelGroup => ({
      ...conditionLevelGroup,
      items: reprintItems.filter(
        conditionLevelGroup.filter,
      ),
    }),
  ).filter(group => group.items.length > 0);

  /* Toggler should be visible if at least one group has more items
    as the given initial limit allows */
  const atLeastOneGroupHasMoreReprintItemsThanLimit = reprintConditionLevelGroups.some(
    group => group.items.length > limitItemsTo,
  );

  return (
    <LeporelloGraphicItem
      className={`leporello-graphic-reprints-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-graphic-reprints-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={atLeastOneGroupHasMoreReprintItemsThanLimit}
    >
      {reprintConditionLevelGroups.map((reprintGroup, idx) => (
        <div
          key={reprintGroup.id}
          className="leporello-graphic-reprints-item"
        >
            <div className="leporello-graphic-reprints-item-intro">
              { idx === 0
                && (
                  <h2 className="chapter">
                    {t(reprintGroup.translations.title)}
                  </h2>
                )
              }
              <h3 className="headline">{t(reprintGroup.translations.subtitle)}</h3>

            </div>
            <div className="leporello-graphic-reprints-item-list">
              <GraphicsList
                items={
                  limitReprintItems
                    ? reprintGroup.items.slice(0, limitItemsTo)
                    : reprintGroup.items
                }
                onItemClick={ innerHandleItemClick }
              />
            </div>
          </div>
      ))}
    </LeporelloGraphicItem>
  );
};
