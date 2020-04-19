import React from 'react';

import ArtefactCard from '~/components/molecules/artefact-card';
import './artefact-overview.scss';

export default ({ items = [] }) => (
  <div
    className="artefact-overview"
    data-component="organisms/artefact-overview"
  >
    {
      items.map(item => (<div
            key={ item.inventoryNumber }
            className="overview-item"
          >
            <ArtefactCard
              title={ item.title }
              subtitle={ item.subtitle }
              text={ item.text }
              to={ item.to }
              imgSrc={ item.imgSrc }
            />
          </div>
      ))
    }
  </div>
);
