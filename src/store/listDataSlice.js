import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleData: [],
  searchData: [],
};

export const listDataSlice = createSlice({
  name: "listData",
  initialState,
  reducers: {
    addsaleData: (state, action) => {
      state.saleData = action.payload;
    },

    addSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { addsaleData, addSearchData } = listDataSlice.actions;

export default listDataSlice.reducer;