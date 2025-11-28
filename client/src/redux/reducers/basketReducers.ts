import { basketApi } from "../api/basketApi";

export const basketReducers = {
  [basketApi.reducerPath]: basketApi.reducer,
};

export const basketMiddleware = [basketApi.middleware];
