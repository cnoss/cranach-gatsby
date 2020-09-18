import React from 'react';

import Logo from '~/components/atoms/logo';
import SearchStatus from '~/components/atoms/search-status';

import './search-header.scss';

export default () => (
  <div
    className="search-header"
    data-component="molecules/search-header"
  >
    <Logo />

    <SearchStatus />

    <div className="right-end">
      <i className="material-icons highlight control">search</i>
      <i className="material-icons highlight control">more_vert</i>
    </div>
  </div>
);
