import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'base',
  initialState: {
    lang: 'en',
  },
  reducers: {
    setLanguage(state, action) {
      return {
        ...state,
        lang: action.payload,
      };
    },
  },
});

export const getLanguage = state => state.base.lang;

export const setLanguage = lang => (dispatch) => {
  dispatch(slice.actions.setLanguage(lang));
};

export default slice.reducer;
