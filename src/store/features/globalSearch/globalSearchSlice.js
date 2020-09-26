import { createSlice } from '@reduxjs/toolkit';
import { searchGloballyFor } from '~/api/globalSearch';

import { getLanguage } from '~/store/baseSlice';

const slice = createSlice({
  name: 'globalSearch',
  initialState: {
    allFieldsTerm: '',
    loading: false,
    results: {
      graphics: [],
      paintings: [],
      archivals: [],
    },
    error: null,
  },
  reducers: {
    setAllFieldsTerm(state, action) {
      return {
        ...state,
        allFieldsTerm: action.payload,
      };
    },
    setSearchLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setSearchResults(state, action) {
      return {
        ...state,
        results: action.payload,
      };
    },
    resetSearchResults(state) {
      return {
        ...state,
        results: {
          graphics: [],
          paintings: [],
          archivals: [],
        },
      };
    },
    setSearchFailed(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});


export const searchForAllFieldsTerm = allFieldsTerm => (dispatch, getState) => {
  const lang = getLanguage(getState());

  dispatch(slice.actions.setAllFieldsTerm(allFieldsTerm));

  if (allFieldsTerm.trim() === '') {
    dispatch(slice.actions.resetSearchResults());
    return;
  }

  dispatch(slice.actions.setSearchLoading(true));

  searchGloballyFor(allFieldsTerm, lang).then(
    results => dispatch(slice.actions.setSearchResults(results)),
    err => dispatch(slice.actions.setSearchFailed(err.toString())),
  ).finally(
    () => {
      dispatch(slice.actions.setSearchLoading(false));
    },
  );
};

export const getAllFieldsTerm = state => state.globalSearch.allFieldsTerm;
export const getSearchLoading = state => state.globalSearch.loading;
export const getSearchResults = state => state.globalSearch.results;
export const getSearchResultItems = (state) => {
  const { graphics, paintings, archivals } = state.globalSearch.results;
  return [...graphics, ...paintings, ...archivals];
};

export default slice.reducer;
