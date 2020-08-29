import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const slice = createSlice({
  name: "brands",
  initialState: {
    list: [],
    isLoading: false,
    pageInfo: {},
  },

  reducers: {
    ADD_BRAND: (brands, action) => {
      if (action.payload) {
        brands.list = [...brands.list, action.payload.data];
      }
      brands.isLoading = false;
    },
    ADD_BRANDS: (brands, action) => {
      if (action.payload) {
        brands.list = [...brands.list, ...action.payload];
      }
      brands.isLoading = false;
    },
    UPDATE_BRAND: (brands, action) => {
      let index = brands.list.findIndex(
        (obj) => obj._id === action.payload.data._id
      );
      brands.list[index].en_name = action.payload.data.en_name;
      brands.list[index].fa_name = action.payload.data.fa_name;
      brands.list[index].description = action.payload.data.description;
      brands.list[index].icon = action.payload.data.icon;
      brands.isLoading = false;
    },
    REMOVE_BRAND: (brands, action) => {
      const newBrands = brands.list.filter(
        (brand) => brand._id !== action.payload._id
      );
      brands.list = newBrands;
      brands.isLoading = false;
    },
    ON_START: (brands, action) => {
      brands.isLoading = true;
    },
    ON_FAILD: (brands, action) => {
      brands.isLoading = false;
    },
  },
});
export const { ADD_BRAND, EDIT_BRAND, REMOVE_BRAND } = slice.actions;
export default slice.reducer;

export const addBrand = (brand) => {
  const { en_name, fa_name, description, brandImage } = brand;
  let form = new FormData();
  form.append("en_name", en_name);
  form.append("fa_name", fa_name);
  form.append("description", description);
  form.append("brandImage", brandImage);
  return actions.API_CALL_START({
    url: "/brand/new",
    method: "POST",
    data: form,
    headers: {
      "content-type": "multipart/form-data",
    },
    onStart: slice.actions.ON_START.type,
    onSuccess: actions.TOAST.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const searchBrand = (brandName) => {
  return actions.API_CALL_START({
    url: "/brand",
    params: { brandName },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_BRAND.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const loadBrands = () => {
  return actions.API_CALL_START({
    url: "/brand",
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.ADD_BRANDS.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const removeBrand = (_id) => {
  return actions.API_CALL_START({
    url: `/brand/delete/${_id}`,
    method: "DELETE",
    toastOnsuccess: { type: "warning" },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.REMOVE_BRAND.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
export const updateBrand = (brand) => {
  const { _id, en_name, fa_name, description, brandImage, icon } = brand;
  let form = new FormData();
  form.append("_id", _id);
  form.append("en_name", en_name);
  form.append("fa_name", fa_name);
  form.append("description", description);
  form.append("icon", icon);
  form.append("brandImage", brandImage);
  return actions.API_CALL_START({
    url: `/brand/update`,
    method: "PUT",
    data: form,
    headers: {
      "content-type": "multipart/form-data",
    },
    toastOnsuccess: { type: "success" },
    onStart: slice.actions.ON_START.type,
    onSuccess: slice.actions.UPDATE_BRAND.type,
    onError: slice.actions.ON_FAILD.type,
  });
};
