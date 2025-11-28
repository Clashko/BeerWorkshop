import { productsApi } from "../api/productsApi";
import productsSlice from "../features/productsSlice";

export const productsReducers = {
  [productsApi.reducerPath]: productsApi.reducer,
  productsState: productsSlice.reducer,
};

export const productsMiddleware = [productsApi.middleware];
