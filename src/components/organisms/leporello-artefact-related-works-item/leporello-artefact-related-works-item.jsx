import React, { useState, useEffect } from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import translations from './translations.json';
import './leporello-artefact-related-works-item.scss';

export default ({
  relatedWorks,
  className = '',
  limitItemsTo = 5,
}) => {
  const { t } = useTranslation('LeporelloArtefactRelatedWorksItem', translations);

  /* Number of initial visible related works items */
  const relatedWorkItemsLimit = limitItemsTo;
  const hasMoreRelatedWorkItemsThanLimit = relatedWorks.length > relatedWorkItemsLimit;

  /* Map related works */
  const relatedWorksItems = relatedWorks.map((relatedWorksItem) => {
    const item = relatedWorksItem.ref;
    const title = (item.titles[0].title) ? `${item.titles[0].title}, ${item.dating.dated}` : item.dating.dated;
    return {
      inventoryNumber: item.inventoryNumber,
      title,
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
      preventLinkFollowing: false,
      triggersInternalTransition: true,
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
        </div>
        <div className="leporello-artefact-related-works-item-list">
          <GraphicsList
            items={
              limitRelatedWorkItems
                ? relatedWorksItems.slice(0, relatedWorkItemsLimit)
                : relatedWorksItems
            }
          />
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
