import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react-lite';

import SearchHeader from '~/components/molecules/search-header';
import ArtefactSearch from '~/components/templates/artefact-search';

import StoreContext from '~/store/StoreContext';

const Search = ({ pageContext }) => {
  const { ui } = useContext(StoreContext);
  const { lang } = pageContext;

  ui.setLanguage(lang.code);

  return (
    <div
      className="page"
      data-page={ `search.${lang.code}` }
    >
      <Helmet>
        <title>Cranach Digital Archive | Search</title>
      </Helmet>

      <div className="page-dark">
        <SearchHeader />

        <main className="main-content">
          <ArtefactSearch />
        </main>
      </div>
    </div>
  );
};


export default observer(Search);
