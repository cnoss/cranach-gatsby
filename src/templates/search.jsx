import React from 'react';
import Helmet from 'react-helmet';
import i18n from '~/i18n';

import SearchHeader from '~/components/molecules/search-header';
import ArtefactSearch from '~/components/organisms/artefact-search';


export default ({ pageContext }) => {
  const { lang } = pageContext;
  i18n(lang.code);

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
