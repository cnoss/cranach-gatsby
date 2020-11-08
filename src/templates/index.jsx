
import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react-lite';


import Navigation from '~/components/molecules/navigation';
import ArtefactOverview from '~/components/organisms/artefact-overview';

import StoreContext from '~/store/StoreContext';

const Index = ({ pageContext }) => {
  const { ui } = useContext(StoreContext);
  const { lang, graphics } = pageContext;
  const [currentArtefactView, setCurrentArtefactView] = useState(ArtefactOverview.DefaultView);

  ui.setLanguage(lang.code);

  return (
    <div
      className="page"
      data-page={ `index.${lang.code}` }
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
            items={ graphics }
          />
        </main>
      </div>
    </div>
  );
};

export default observer(Index);
