import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const slice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
    pageInfo: {},
  },

  reducers: {
    ADD_CATEGORY: (categories, action) => {
      if (action.payload) {
        categories.list = [...categories.list, action.payload.data];
      }
      categories.isLoading = false;
    },
    ADD_CATEGORYIES: (categories, action) => {
      if (action.payload) {
        categories.list = [...categories.list, ...action.payload];
      }
      categories.isLoading = false;
    },
    UPDATE_CATEGORY: (categories, action) => {
      let index = categories.list.findIndex(
        (obj) => obj._id === action.payload.data._id
      );

      categories.list[index].en_name = action.payload.data.en_name;
      categories.list[index].fa_name = action.payload.data.fa_name;
      categories.list[index].description = action.payload.data.description;
      categories.list[index].icon = action.payload.data.icon;
      categories.isLoading = false;
    },
    REMOVE_CATEGORY: (categories, action) => {
      const newcategories = categories.list.filter(
        (brand) => brand._id !== action.payload._id
      );
      categories.list = newcategories;
      categories.isLoading = false;
    },
    ON_START: (categories, action) => {
      categories.isLoading = true;
    },
    ON_FAILD: (categories, action) => {
      categories.isLoading = false;
    },
  },
});
export const { ADD_CATEGORY, ADD_CATEGORYIES } = slice.actions;
export default slice.reducer;

export const addCategory = (category) => {
  const { en_name, fa_name, description, catIcon } = category;
  let form = new FormData();
  form.append("en_name", en_name);
  form.append("fa_name", fa_name);
  form.append("description", description);
  form.append("catIcon", catIcon);
  return actions.API_CALL_START({
    url: "/category/new",
    method: "POST",
    data: form,
    headers: {
      "content-type": "multipart/form-data",
    },
    toastOnsuccess: { type: "success" },

    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_CATEGORY.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const searchCategory = (category) => {
  return actions.API_CALL_START({
    url: "/category",
    params: { category },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_CATEGORY.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const loadCategories = () => {
  return actions.API_CALL_START({
    url: "/category",
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_CATEGORYIES.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const removeCategory = (_id) => {
  return actions.API_CALL_START({
    url: `/category/delete/${_id}`,
    method: "DELETE",
    toastOnsuccess: { type: "warning" },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.REMOVE_CATEGORY.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const updateCategory = (category) => {
  const { _id, en_name, fa_name, description, catIcon, icon } = category;
  let form = new FormData();
  form.append("_id", _id);
  form.append("en_name", en_name);
  form.append("fa_name", fa_name);
  form.append("description", description);
  form.append("icon", icon);
  form.append("catIcon", catIcon);
  return actions.API_CALL_START({
    url: `/category/update`,
    method: "PUT",
    data: form,
    headers: {
      "content-type": "multipart/form-data",
    },
    toastOnsuccess: { type: "success" },
    onStart: slice.actions.ON_START.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
