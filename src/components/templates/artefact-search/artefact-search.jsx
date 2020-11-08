import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';

import ArtefactOverview from '~/components/organisms/artefact-overview';
import SearchSidebar from '~/components/organisms/search-sidebar';

import './artefact-search.scss';

import StoreContext from '~/store/StoreContext';

const ArtefactSearch = () => {
  const { globalSearch } = useContext(StoreContext);

  return (
    <div
      className="artefact-search"
      data-component="organisms/artefact-search"
    >
      <div className="artefact-search__results-area">
      { globalSearch.loading && 'Loading...' }
      { !globalSearch.loading
        && <ArtefactOverview
          items={ globalSearch.flattenedSearchResultItems }
        />
      }
      </div>
      <div className="artefact-search__sidebar">
        <SearchSidebar />
      </div>
    </div>
  );
};

export default observer(ArtefactSearch);
