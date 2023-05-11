import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("setting current user")
      console.log("user object is:", action.payload)
      state.currentUser = action.payload;
    },
     clearCurrentUser: (state) => {
       console.log("clearing current user")
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;