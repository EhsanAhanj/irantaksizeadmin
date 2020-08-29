import { combineReducers } from "redux";
import instaserchReducer from "./instasearch";
import merchantReducer from "./merchants";
import brandReducer from "./brands";
import uiReducer from "./ui";
import userReducer from "./user";

export default combineReducers({
  instasearch: instaserchReducer,
  brands: brandReducer,
  merchants: merchantReducer,
  ui: uiReducer,
  currentUser: userReducer,
});
