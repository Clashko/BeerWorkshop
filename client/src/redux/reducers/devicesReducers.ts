import { devicesApi } from "../api/devicesApi";
import devicesSlice from "../features/devicesSlice";

export const devicesReducers = {
  [devicesApi.reducerPath]: devicesApi.reducer,
  devicesState: devicesSlice.reducer,
};

export const devicesMiddleware = [devicesApi.middleware];
