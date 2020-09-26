import React from 'react';
import { useSelector } from 'react-redux';

import ArtefactOverview from '~/components/organisms/artefact-overview';
import SearchSidebar from '~/components/organisms/search-sidebar';

import {
  getSearchLoading,
  getSearchResultItems,
} from '~/store/features/globalSearch/globalSearchSlice';

import './artefact-search.scss';

export default () => {
  const searchIsCurrentlyLoading = useSelector(getSearchLoading);
  const searchResultItems = useSelector(getSearchResultItems);

  return (
    <div
      className="artefact-search"
      data-component="organisms/artefact-search"
    >
      <div className="artefact-search__results-area">
      { searchIsCurrentlyLoading && 'Loading...' }
      { !searchIsCurrentlyLoading
        && <ArtefactOverview
          items={ searchResultItems }
        />
      }
      </div>
      <div className="artefact-search__sidebar">
        <SearchSidebar />
      </div>
    </div>
  );
};
