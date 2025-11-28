import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as Reducers from "../reducers";
import { save, load } from "redux-localstorage-simple";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const reducers = combineReducers({
  ...Reducers.authReducers,
  ...Reducers.userReducers,
  ...Reducers.basketReducers,
  ...Reducers.devicesReducers,
  ...Reducers.devicesInventoryReducers,
  ...Reducers.productsReducers,
  ...Reducers.productsInventoryReducers,
  ...Reducers.checksReducers,
  ...Reducers.statisticReducers,
  ...Reducers.writeOffReducers,
});

const LOCAL_STORAGE_CONFIG = {
  states: ["authState", "userState"],
  namespace: "beerworkshop",
  disableWarnings: true,
};

export const store = configureStore({
  reducer: reducers,
  preloadedState: load(LOCAL_STORAGE_CONFIG),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      save(LOCAL_STORAGE_CONFIG),
      ...Reducers.authMiddleware,
      ...Reducers.userMiddleware,
      ...Reducers.basketMiddleware,
      ...Reducers.devicesMiddleware,
      ...Reducers.devicesInventoryMiddleware,
      ...Reducers.productsMiddleware,
      ...Reducers.productsInventoryMiddleware,
      ...Reducers.checksMiddleware,
      ...Reducers.statisticMiddleware,
      ...Reducers.writeOffMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
