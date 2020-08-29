import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const slice = createSlice({
  name: "categories",
  initialState: {
    list: [
      { name: "Alligator" },
      { name: "Bask" },
      { name: "Crocodilian" },
      { name: "Death Roll" },
      { name: "Eggs" },
      { name: "Jaws" },
      { name: "Reptile" },
      { name: "Solitary" },
      { name: "Tail" },
      { name: "Wetlands" },
    ],
    isLoading: false,
    pageInfo: {},
  },

  reducers: {
    ADD_CATEGORY: (categories, action) => {
      if (action.payload) {
        categories.list.push(action.payload);
      }
      categories.isLoading = false;
    },
    EDIT_CATEGORY: () => {},
    REMOVE_CATEGORY: () => {},
    ON_START: (categories, action) => {
      categories.isLoading = true;
    },
    ON_FAILD: (categories, action) => {
      categories.isLoading = false;
    },
  },
});
export const { ADD_CATEGORY, EDIT_CATEGORY, REMOVE_CATEGORY } = slice.actions;
export default slice.reducer;

export const addCategory = (category) => {
  return actions.API_CALL_START({
    url: "/category",
    method: "POST",
    data: category,
    onStart: slice.actions.ON_POST_START.type,
    onSuccess: slice.actions.ADD_CATEGORY.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const searchCategory = (categoryName) => {
  return actions.API_CALL_START({
    url: "/category",
    params: { categoryName },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_CATEGORY.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const loadCategories = () => {
  return actions.API_CALL_START({
    url: "/category",
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_CATEGORY.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
