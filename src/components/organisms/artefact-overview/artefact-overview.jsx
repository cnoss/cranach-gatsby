import React from 'react';

import GraphicCard from '~/components/molecules/graphic-card';


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
          <GraphicCard
            title={ (item.titles[0] && item.titles[0].title) || '' }
            subtitle={ item.dating.dated || '' }
            to={ `/${item.langCode}/${item.slug}` }
            imgSrc={ (item && item.image && item.image.small) }
          />
        </div>
      ))
    }
  </div>
);
