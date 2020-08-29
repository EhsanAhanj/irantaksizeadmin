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
        merchants.list = [...merchants.list, action.payload.data];
      }
      merchants.isLoading = false;
    },
    ADD_MERCHANTS: (merchants, action) => {
      if (action.payload) {
        merchants.list = [...merchants.list, ...action.payload];
      }
      merchants.isLoading = false;
    },
    UPDATE_MERCHANT: (merchants, action) => {
      // let index = merchants.list.findIndex(
      //   (obj) => obj._id === action.payload.data._id
      // );

      // merchants.list[index].en_name = action.payload.data.en_name;
      // merchants.list[index].fa_name = action.payload.data.fa_name;
      // merchants.list[index].description = action.payload.data.description;
      // merchants.list[index].icon = action.payload.data.icon;
      merchants.isLoading = false;
    },
    REMOVE_MERCHANT: (merchants, action) => {
      const newMerchants = merchants.list.filter(
        (merchant) => merchant._id !== action.payload._id
      );
      merchants.list = newMerchants;
      merchants.isLoading = false;
    },
    ON_START: (merchants, action) => {
      merchants.isLoading = true;
    },
    ON_FAILD: (merchants, action) => {
      merchants.isLoading = false;
    },
  },
});
export const { ADD_MERCHANT, ADD_MERCHANTS } = slice.actions;
export default slice.reducer;

// برای ساجستشن
export const searchMerchant = (username) => {
  return actions.API_CALL_START({
    url: "/merchant",
    params: { username },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_MERCHANT.type,
    onError: slice.actions.ON_FAILD.type,
  });
};

// export const addCategory = (category) => {
//   const { en_name, fa_name, description, catIcon } = category;
//   let form = new FormData();
//   form.append("en_name", en_name);
//   form.append("fa_name", fa_name);
//   form.append("description", description);
//   form.append("catIcon", catIcon);
//   return actions.API_CALL_START({
//     url: "/category/new",
//     method: "POST",
//     data: form,
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//     toastOnsuccess: { type: "success" },

//     onStart: slice.actions.ON_START.type,
//     onSuccess: slice.actions.ADD_CATEGORY.type,
//     onError: slice.actions.ON_FAILD.type,
//   });
// };
// export const searchCategory = (category) => {
//   return actions.API_CALL_START({
//     url: "/category",
//     params: { category },
//     onStart: slice.actions.ON_START.type,
//     onSuccess: slice.actions.ADD_CATEGORY.type,
//     onError: slice.actions.ON_FAILD.type,
//   });
// };
// export const loadCategories = () => {
//   return actions.API_CALL_START({
//     url: "/category",
//     onStart: slice.actions.ON_START.type,
//     onSuccess: slice.actions.ADD_CATEGORYIES.type,
//     onError: slice.actions.ON_FAILD.type,
//   });
// };
// export const removeCategory = (_id) => {
//   return actions.API_CALL_START({
//     url: `/category/delete/${_id}`,
//     method: "DELETE",
//     toastOnsuccess: { type: "warning" },
//     onStart: slice.actions.ON_START.type,
//     onSuccess: slice.actions.REMOVE_CATEGORY.type,
//     onError: slice.actions.ON_FAILD.type,
//   });
// };
// export const updateCategory = (category) => {
//   const { _id, en_name, fa_name, description, catIcon, icon } = category;
//   let form = new FormData();
//   form.append("_id", _id);
//   form.append("en_name", en_name);
//   form.append("fa_name", fa_name);
//   form.append("description", description);
//   form.append("icon", icon);
//   form.append("catIcon", catIcon);
//   return actions.API_CALL_START({
//     url: `/category/update`,
//     method: "PUT",
//     data: form,
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//     toastOnsuccess: { type: "success" },
//     onStart: slice.actions.ON_START.type,
//     onError: slice.actions.ON_FAILD.type,
//   });
// };

// export const addMerchant = (merchant) => {
//   return actions.API_CALL_START({
//     url: "/merchant",
//     method: "POST",
//     data: merchant,
//     onStart: slice.actions.ON_POST_START.type,
//     onSuccess: slice.actions.ADD_MERCHANT.type,
//     onError: slice.actions.ON_FAILD.type,
//   });
// };
