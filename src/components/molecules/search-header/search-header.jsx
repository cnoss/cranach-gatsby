import React from 'react';
import { useSelector } from 'react-redux';

import Logo from '~/components/atoms/logo';
import SearchStatus from '~/components/atoms/search-status';

import { getSearchResults } from '~/store/features/globalSearch/globalSearchSlice';

import './search-header.scss';

export default () => {
  const results = useSelector(getSearchResults);

  return (<div
      className="search-header"
      data-component="molecules/search-header"
    >
      <Logo />

      <SearchStatus status={{
        graphics: results.graphics.length,
        paintings: results.paintings.length,
        archivals: results.archivals.length,
      }} />

      <div className="right-end">
        <i className="material-icons highlight control">search</i>
        <i className="material-icons highlight control">more_vert</i>
      </div>
    </div>
  );
};
