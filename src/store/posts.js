import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const baseURL =
  "https://young-fortress-89381.herokuapp.com/http://www.tsetmc.com/";

const slice = createSlice({
  name: "posts",
  initialState: {
    rawPosts: {
      list: [],
      isLoading: false,
      pageInfo: {},
    },
    acceptedPosts: {
      list: [],
      isLoading: false,
      pageInfo: {},
    },
  },
  reducers: {
    ACCEPT_RAWPOST: () => {},
  },
});
export const {} = slice.actions;
export default slice.reducer;

export const RawPostUpdate = (store) => {
  const url = "";

  return actions.API_CALL_START({
    baseURL,
    url,
    onStart: slice.actions.MW_CALL_START.type,
    onError: slice.actions.CALL_FAILED.type,
    onSuccess: slice.actions.MW_UPDATE.type,
  });
};
export const LoadClientTypeUpdate = () => {
  const url = "tsev2/data/ClientTypeAll.aspx";

  return actions.API_CALL_START({
    baseURL,
    url,
    onStart: slice.actions.CLT_CALL_START.type,
    onError: slice.actions.CALL_FAILED.type,
    onSuccess: slice.actions.CLT_UPDATE.type,
  });
};
export const LoadInstHistoryUpdate = () => {
  return actions.API_CALL_START({
    baseURL,
    onStart: slice.actions.LIH_CALL_START.type,
    onError: slice.actions.CALL_FAILED.type,
    onSuccess: slice.actions.LIH_UPDATE.type,
  });
};
