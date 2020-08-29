import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import moment from "moment";

const slice = createSlice({
  name: "instasearch",
  initialState: {
    list: [],
    pageInfo: {},
    lastFetch: null,
    loading: false,
  },

  reducers: {
    ADD_SUGGESTIONS: (instasearch, action) => {
      const usernames = action.payload;
      instasearch.list = [...new Set(usernames)];
      instasearch.lastFetch = Date.now();
      instasearch.loading = false;
    },
    FETCH_TIME_UPDATE: (instasearch, action) => {
      instasearch.lastFetch = Date.now();
      instasearch.loading = true;
    },
    ON_ERROR: (instasearch, action) => {
      instasearch.loading = false;
    },
  },
});

export const { ADD_SUGGESTIONS } = slice.actions;
export default slice.reducer;

export const loadSuggestions = (search) => (dispatch, getState) => {
  const { lastFetch } = getState().instasearch;
  const difInmiliSecond = moment().diff(moment(lastFetch), "milliseconds");

  if (difInmiliSecond < 3000 && lastFetch !== undefined) {
    return;
  }
  return dispatch(
    actions.API_CALL_START({
      url: "/instasearch",
      onStart: slice.actions.FETCH_TIME_UPDATE.type,
      params: { search: search },
      onSuccess: slice.actions.ADD_SUGGESTIONS.type,
      onError: slice.actions.ON_ERROR.type,
    })
  );
};
