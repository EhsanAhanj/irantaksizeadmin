import * as actions from "../actions";
import { toast } from "react-toastify";

const toasty = ({ dispatch, getState }) => (next) => (action) => {
  let toastType = action.toastType || "success";
  if (action.type === actions.TOAST.type) {
    return toast(action.payload.message, { type: toastType });
  } else if (action.type === actions.TOAST_ERROR.type) {
    return toast.error(action.payload);
  } else {
    next(action);
  }
};
export default toasty;
