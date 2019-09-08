import React from 'react';

import GraphicCard from '~/components/molecules/graphic-card';


export default ({ items = [] }) => (
  <div className="graphics-overview columns is-multiline">
    {
      items.map((item) => (
        <div
          key={ item.inventoryNumber }
          className="item column is-one-third-desktop is-one-fifth-widescreen is-half-tablet"
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
