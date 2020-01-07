import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CopyText from '~/components/atoms/copy-text';
import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import './leporello-artefact-related-works-item.scss';

export default ({
  relatedWorks,
  className = '',
  onItemClick,
  limitItemsTo = 100,
}) => {
  const { t } = useTranslation('LeporelloGraphicRelatedWorksItem');

  /* Number of initial visible related works items */
  const relatedWorkItemsLimit = limitItemsTo;
  const hasMoreRelatedWorkItemsThanLimit = relatedWorks.length > relatedWorkItemsLimit;

  /* Map related works */
  const relatedWorksItems = relatedWorks.map((relatedWorksItem) => {
    const item = relatedWorksItem.ref;

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
  const [limitRelatedWorkItems, setLimitRelatedWorkItems] = useState(!isOpen);

  /* React on additional classnames changes */
  useEffect(() => {
    setAdditionalClassNames([
      ...className.split(' '),
    ]);
  }, [className, isOpen]);

  /* React on open / close toggle */
  useEffect(() => {
    setLimitRelatedWorkItems(!isOpen);
  }, [isOpen]);

  const innerHandleItemClick = (item) => {
    const foundSelectedItem = relatedWorks.find(
      refItem => refItem.inventoryNumber === item.inventoryNumber,
    );

    if (foundSelectedItem && (typeof onItemClick) === 'function') {
      onItemClick(foundSelectedItem.ref);
    }
  };

  return (
    <LeporelloGraphicItem
      className={`leporello-artefact-related-works-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-artefact-related-works-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={hasMoreRelatedWorkItemsThanLimit}
    >
      <div className="leporello-artefact-related-works-item">
        <div className="leporello-artefact-related-works-item-intro">
          <h2 className="chapter">{t('Related works')}</h2>
          <CopyText
            text={t('Description')}
          />
        </div>
        <div className="leporello-artefact-related-works-item-list">
          <GraphicsList
            items={
              limitRelatedWorkItems
                ? relatedWorksItems.slice(0, relatedWorkItemsLimit)
                : relatedWorksItems
            }
            onItemClick={innerHandleItemClick}
          />
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
