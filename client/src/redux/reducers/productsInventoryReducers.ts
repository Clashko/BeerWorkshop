import { productsInventoryApi } from "../api/productsInventoryApi";
import productsInventorySlice from "../features/productsInventorySlice";

export const productsInventoryReducers = {
  [productsInventoryApi.reducerPath]: productsInventoryApi.reducer,
  productsInventoryState: productsInventorySlice.reducer,
};

export const productsInventoryMiddleware = [productsInventoryApi.middleware];
