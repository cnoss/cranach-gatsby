import React from 'react';

import StoreContext from '~/store/StoreContext';

import { UI, GlobalSearch } from './store';
import globalSearchAPI from '~/api/globalSearch';

const ui = new UI();
const globalSearch = new GlobalSearch(ui, globalSearchAPI);

export default ({ element }) => (
  <StoreContext.Provider value={ { ui, globalSearch } }>
    {element}
  </StoreContext.Provider>
);
