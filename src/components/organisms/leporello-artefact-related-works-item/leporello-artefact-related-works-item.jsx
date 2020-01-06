import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CopyText from '~/components/atoms/copy-text';
import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import './leporello-artefact-related-works-item.scss';

export default ({
  /* relatedWorks, */
  className = '',
}) => {
  const { t } = useTranslation('LeporelloGraphicRelatedWorksItem');

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
      className={`leporello-artefact-related-works-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-artefact-related-works-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={true}
    >
      <div className="leporello-artefact-related-works-item">
        <div className="leporello-artefact-related-works-item-intro">
          <h2 className="chapter">{ t('Related works') }</h2>
          <CopyText
            text={ t('Description') }
          />
          <div className="leporello-artefact-related-works-item-list">
            <GraphicsList items={[]} />
          </div>
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
