import React from 'react';

import ArtefactCard from '~/components/molecules/artefact-card';
import './artefact-overview.scss';

export default ({ items = [] }) => (
  <div
    className="artefact-overview"
    data-component="organisms/artefact-overview"
  >
    {
      items.map((item) => {
        const title = (item.titles[0] && item.titles[0].title) || '';
        const subtitle = item.dating.dated || '';
        const to = `/${item.langCode}/${item.slug}`;
        const imgSrc = (item && item.images && item.images.sizes.s && item.images.sizes.s.src);

        return (
          <div
            key={ item.inventoryNumber }
            className="overview-item"
          >
            <ArtefactCard
              title={ title }
              subtitle={ subtitle }
              to={ to }
              imgSrc={ imgSrc }
            />
          </div>
        );
      })
    }
  </div>
);
