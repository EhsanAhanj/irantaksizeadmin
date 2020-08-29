import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "currentUser",
  initialState: {},
  reducers: {
    LOGIN: () => {},
    LOGOUT: () => {},
  },
});

export const { LOGIN, LOGOUT } = slice.actions;

export default slice.reducer;
