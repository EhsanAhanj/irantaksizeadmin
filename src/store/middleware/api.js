import axios from "axios";
import * as actions from "../actions";

const api = ({ store, dispatch }) => (next) => async (action) => {
  if (action.type !== actions.API_CALL_START.type) return next(action);

  const {
    baseURL = process.env.REACT_APP_baseURL,
    url = "",
    method = "GET",
    data = null,
    params = null,
    headers = null,
    onStart,
    onSuccess,
    toastOnsuccess = null,
    onError,
  } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
      baseURL,
      url,
      data: data || params,
      method,
    });
    if (toastOnsuccess)
      dispatch({
        type: actions.TOAST.type,
        payload: response.data,
        toastType: toastOnsuccess.type,
      });
    if (onSuccess) return dispatch({ type: onSuccess, payload: response.data });
    dispatch(actions.API_CALL_SUCCESS(response.data));
  } catch (error) {
    if (onError) dispatch({ type: onError, payload: error.message });
    dispatch({ type: actions.TOAST_ERROR.type, payload: error.message });
  }
};

export default api;
