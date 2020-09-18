import React from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import SearchHeader from '~/components/molecules/search-header';
import ArtefactOverview from '~/components/organisms/artefact-overview';
import SearchSidebar from '~/components/organisms/search-sidebar';

import i18n from '~/i18n';

import {
  searchFor,
  getSearchTerm,
  getSearchLoading,
  getSearchResultItems,
} from '~/features/globalSearch/globalSearchSlice';


export default ({ pageContext }) => {
  const { lang } = pageContext;
  i18n(lang.code);

  const dispatch = useDispatch();
  const searchTerm = useSelector(getSearchTerm);
  const searchIsCurrentlyLoading = useSelector(getSearchLoading);
  const searchResultItems = useSelector(getSearchResultItems);

  console.log(searchIsCurrentlyLoading, searchResultItems, dispatch, searchFor, searchTerm);

  // onChange={e => dispatch(searchFor(e.target.value.trim()))}

  const foundArtefacts = [];

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
          <ArtefactOverview
            items={ foundArtefacts }
          />

          <SearchSidebar />
        </main>
      </div>
    </div>
  );
};
