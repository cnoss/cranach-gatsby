import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import Logo from '~/components/atoms/logo';
import SearchStatus from '~/components/atoms/search-status';

import './search-header.scss';

import StoreContext from '~/store/StoreContext';

const SearchHeader = () => {
  const { globalSearch } = useContext(StoreContext);

  return (<div
      className="search-header"
      data-component="molecules/search-header"
    >
      <Logo />

      <SearchStatus status={{
        graphics: globalSearch.results.graphics.length,
        paintings: globalSearch.results.paintings.length,
        archivals: globalSearch.results.archivals.length,
      }} />

      <div className="right-end">
        <i className="material-icons highlight control">search</i>
        <i className="material-icons highlight control">more_vert</i>
      </div>
    </div>
  );
};


export default observer(SearchHeader);
