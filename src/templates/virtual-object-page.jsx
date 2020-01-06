// src/templates/page.js

import React from 'react';
import Helmet from 'react-helmet';

import Navigation from '~/components/molecules/navigation';
import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicDetailsItem from '~/components/organisms/leporello-graphic-details-item';
import LeporelloGraphicReprintsItem from '~/components/organisms/leporello-graphic-reprints-item';
import LeporelloArtefactRelatedWorksItem from '~/components/organisms/leporello-artefact-related-works-item';

import i18n from '~/i18n';


const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;
  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  i18n(graphic.langCode);

  return (
    <div
      className="page"
      data-template="page"
    >
      <Helmet>
        <title>Grafiken | {title} | Virtual</title>
      </Helmet>

      <Navigation
        goBack={ true }
      />

      <section className="body">
        <Leporello>
          <LeporelloGraphicDetailsItem graphic={graphic} />
          <LeporelloGraphicReprintsItem graphic={graphic} />
          <LeporelloArtefactRelatedWorksItem graphic={graphic} />
        </Leporello>
      </section>
    </div>
  );
};

export default PageTemplate;
