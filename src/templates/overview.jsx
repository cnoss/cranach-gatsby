import React, { useState } from 'react';
import Helmet from 'react-helmet';

import Navigation from '~/components/molecules/navigation';
import ArtefactOverview from '~/components/organisms/artefact-overview';

import graphic from '~/libs/transformers/graphic';

import i18n from '~/i18n';

export default ({ pageContext }) => {
  const { langCode, graphics } = pageContext;

  i18n(langCode);

  const items = graphics
    .filter(graphic.byImageExistence)
    .map(graphic.toArtefact);

  const [currentArtefactView, setCurrentArtefactView] = useState(ArtefactOverview.DefaultView);

  return (
    <div
      className="page"
      data-page={ `index.${langCode}`}
    >
      <Helmet>
        <title>Cranach Digital Archive | Home</title>
      </Helmet>

      <div
        className="page-dark"
      >
        <Navigation>
          <ArtefactOverview.Switcher
            view={ currentArtefactView }
            handleChange={ setCurrentArtefactView }
          />
        </Navigation>

        <main
          className="main-content"
        >
          <ArtefactOverview
            view={ currentArtefactView }
            items={ items }
          />
        </main>
      </div>
    </div>
  );
};
