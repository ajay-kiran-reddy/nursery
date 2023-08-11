import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "./components/orders/slices/slice";
import logger from "redux-logger";
import RootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const rootReducer = {
  order: orderSlice.reducer,
};

export const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: [logger, sagaMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(RootSaga);
