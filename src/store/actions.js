import { createAction } from "@reduxjs/toolkit";

export const API_CALL_START = createAction("API_CALL_START");
export const API_CALL_SUCCESS = createAction("API_CALL_SUCCESS");
export const API_CALL_FAILED = createAction("API_CALL_FAILED");

export const TOAST = createAction("TOAST");
export const TOAST_ERROR = createAction("TOAST_ERROR");
