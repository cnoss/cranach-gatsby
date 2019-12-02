// src/templates/page.js

import React from 'react';
import Helmet from 'react-helmet';

import Navigation from '~/components/molecules/navigation';
import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicDetailsItem from '~/components/organisms/leporello-graphic-details-item';


const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  return (
    <div
      className="page"
      data-template="page"
    >
      <Helmet>
        <title>Grafiken | { title } | Real</title>
      </Helmet>

      <Navigation />

      <section className="body">
        <Leporello>
          <LeporelloGraphicDetailsItem
            graphic={ graphic }
          />
        </Leporello>
      </section>
    </div>
  );
};

export default PageTemplate;
