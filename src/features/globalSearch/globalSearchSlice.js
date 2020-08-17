import { createSlice } from '@reduxjs/toolkit';
import { searchGloballyFor } from '~/api/globalSearch';

const slice = createSlice({
  name: 'globalSearch',
  initialState: {
    term: '',
    loading: false,
    resultItems: null,
    error: null,
  },
  reducers: {
    setSearchTerm(state, action) {
      return {
        ...state,
        term: action.payload,
      };
    },
    setSearchLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setSearchResultItems(state, action) {
      return {
        ...state,
        resultItems: action.payload,
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


export const searchFor = term => (dispatch) => {
  dispatch(slice.actions.setSearchTerm(term));

  if (term.trim() === '') {
    dispatch(slice.actions.setSearchResultItems(null));
    return;
  }

  dispatch(slice.actions.setSearchLoading(true));

  searchGloballyFor(term).then(
    resultItems => dispatch(slice.actions.setSearchResultItems(resultItems)),
    err => dispatch(slice.actions.setSearchFailed(err.toString())),
  ).finally(
    () => {
      dispatch(slice.actions.setSearchLoading(false));
    },
  );
};

export const getSearchTerm = state => state.globalSearch.term;
export const getSearchLoading = state => state.globalSearch.loading;
export const getSearchResultItems = state => state.globalSearch.resultItems;

export default slice.reducer;
