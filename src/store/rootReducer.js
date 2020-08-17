import { combineReducers } from '@reduxjs/toolkit';

import globalSearchReducer from '~/features/globalSearch/globalSearchSlice';

export default combineReducers({
  globalSearch: globalSearchReducer,
});
