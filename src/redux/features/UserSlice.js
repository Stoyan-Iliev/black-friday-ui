import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    email: null,
    tokenType: null,
    accessToken: null,
    roles: null,
    isLoggedIn: false,
  },
  reducers: {
    sliceSignIn: (state, action) => {
      console.log(action);
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.tokenType = action.payload.tokenType;
      state.accessToken = action.payload.accessToken;
      state.roles = action.payload.roles;
      state.isLoggedIn = true;
    },
    sliceSignOut: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.tokenType = null;
      state.accessToken = null;
      state.roles = null;
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sliceSignIn, sliceSignOut } = userSlice.actions;

export default userSlice.reducer;
