import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValues: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchValue: (state, action) => {
      state.searchValues.unshift(action.payload);
    },
    removeSearchValue: (state, action) => {
      state.searchValues = state.searchValues.filter(
        (value) => value !== action.payload
      );
    },
  },
});

export const { addSearchValue, removeSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
