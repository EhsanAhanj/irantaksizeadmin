import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const slice = createSlice({
  name: "merchants",
  initialState: {
    list: [],
    isLoading: false,
    pageInfo: {},
  },

  reducers: {
    ADD_MERCHANT: (merchants, action) => {
      if (action.payload) {
        merchants.list.push(action.payload);
      }
      merchants.isLoading = false;
    },
    EDIT_MERCHANT: () => {},
    REMOVE_MERCHANT: () => {},
    ON_START: (merchants, action) => {
      merchants.isLoading = true;
    },
    ON_FAILD: (merchants, action) => {
      merchants.isLoading = false;
    },
  },
});
export const { ADD_MERCHANT, EDIT_MERCHANT, REMOVE_MERCHANT } = slice.actions;
export default slice.reducer;

export const addMerchant = (merchant) => {
  return actions.API_CALL_START({
    url: "/merchant",
    method: "POST",
    data: merchant,
    onStart: slice.actions.ON_POST_START.type,
    onSuccess: slice.actions.ADD_MERCHANT.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const searchMerchant = (username) => {
  return actions.API_CALL_START({
    url: "/merchant",
    params: { username },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_MERCHANT.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
