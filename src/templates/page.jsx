// src/templates/page.js

import React from 'react';
import Helmet from 'react-helmet';

import ZoomImage from '~/components/atoms/zoomImage';
import Navigation from '~/components/molecules/navigation';


const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  return (
    <div
      className="page"
    >
      <Helmet>
        <title>Grafiken | { title }</title>
      </Helmet>

      <Navigation />

      <div className="container">
        <div className="columns">
          <div className="column">
            <ZoomImage
              src={ graphic.image.xlarge }
              preloadSrc={ graphic.image.medium }
              alt={ title }
            />
          </div>

          <div className="column">
            <p>{ title }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
