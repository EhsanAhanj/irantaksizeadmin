import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: { filter: "", query: "" },
  reducers: {
    SET_FILTER: () => {},
    SET_QUERY: () => {},
  },
});

export const { SET_FILTER, SET_QUERY } = slice.actions;
export default slice.reducer;
