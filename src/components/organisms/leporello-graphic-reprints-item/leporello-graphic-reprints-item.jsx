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

    const smallestImageSrc = item.representativeImage.sizes.small.src;

    return {
      inventoryNumber: item.inventoryNumber,
      title: [item.dating.dated, ', ', item.owner],
      to: `/${item.metadata.langCode}/${item.slug}`,
      imgSrc: smallestImageSrc,
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
      (refItem) => refItem.inventoryNumber === item.inventoryNumber,
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
      filter: (reprintRefItem) => reprintRefItem && [0, 1].includes(reprintRefItem.conditionLevel),
      items: [],
    },
    {
      id: '2nd-state',
      translations: {
        title: 'Impressions',
        subtitle: '2nd state',
        description: '2nd state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 2,
      items: [],
    },
    {
      id: '3rd-state',
      translations: {
        title: 'Impressions',
        subtitle: '3rd state',
        description: '3rd state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 3,
      items: [],
    },
    {
      id: '4th-state',
      translations: {
        title: 'Impressions',
        subtitle: '4th state',
        description: '4th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 4,
      items: [],
    },
    {
      id: '5th-state',
      translations: {
        title: 'Impressions',
        subtitle: '5th state',
        description: '5th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 5,
      items: [],
    },
    {
      id: '6th-state',
      translations: {
        title: 'Impressions',
        subtitle: '6th state',
        description: '6th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 6,
      items: [],
    },
    {
      id: '7th-state',
      translations: {
        title: 'Impressions',
        subtitle: '7th state',
        description: '7th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 7,
      items: [],
    },
    {
      id: '8th-state',
      translations: {
        title: 'Impressions',
        subtitle: '8th state',
        description: '8th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 8,
      items: [],
    },
    {
      id: '9th-state',
      translations: {
        title: 'Impressions',
        subtitle: '9th state',
        description: '9th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 9,
      items: [],
    },
    {
      id: '10th-state',
      translations: {
        title: 'Impressions',
        subtitle: '10th state',
        description: '10th state description',
      },
      filter: (reprintRefItem) => reprintRefItem && reprintRefItem.conditionLevel === 10,
      items: [],
    },
  ];

  const reprintConditionLevelGroups = expectedReprintConditionLevelGroups.map(
    (conditionLevelGroup) => ({
      ...conditionLevelGroup,
      items: reprintItems.filter(
        conditionLevelGroup.filter,
      ),
    }),
  ).filter((group) => group.items.length > 0);

  /* Toggler should be visible if at least one group has more items
    as the given initial limit allows */
  const atLeastOneGroupHasMoreReprintItemsThanLimit = reprintConditionLevelGroups.some(
    (group) => group.items.length > limitItemsTo,
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
