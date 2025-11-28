import { devicesInventoryApi } from "../api/devicesInventoryApi";
import devicesInventorySlice from "../features/devicesInventorySlice";

export const devicesInventoryReducers = {
  [devicesInventoryApi.reducerPath]: devicesInventoryApi.reducer,
  devicesInventoryState: devicesInventorySlice.reducer,
};

export const devicesInventoryMiddleware = [devicesInventoryApi.middleware];
