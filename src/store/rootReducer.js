import { combineReducers } from '@reduxjs/toolkit';

import baseReducer from './baseSlice';
import globalSearchReducer from './features/globalSearch/globalSearchSlice';

export default combineReducers({
  base: baseReducer,
  globalSearch: globalSearchReducer,
});
