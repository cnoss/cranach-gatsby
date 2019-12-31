import React from 'react';

import ArtefactCard from '~/components/molecules/artefact-card';
import './artefact-overview.scss';

export default ({ items = [] }) => (
  <div
    className="artefact-overview"
    data-component="organisms/artefact-overview"
  >
    {
      items.map(item => (
        <div
          key={ item.inventoryNumber }
          className="overview-item"
        >
          <ArtefactCard
            title={ (item.titles[0] && item.titles[0].title) || '' }
            subtitle={ item.dating.dated || '' }
            to={ `/${item.langCode}/${item.slug}` }
            imgSrc={ `${item.imagebase}-s.jpg` }
          />
        </div>
      ))
    }
  </div>
);
