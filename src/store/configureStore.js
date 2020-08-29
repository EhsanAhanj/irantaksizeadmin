import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toasty from "./middleware/toast";
import api from "./middleware/api";

export default () =>
  configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      logger,
      toasty,
      api,
    ],
  });
