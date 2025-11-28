import { checksApi } from "../api/checksApi";
import checksSlice from "../features/checksSlice";

export const checksReducers = {
  [checksApi.reducerPath]: checksApi.reducer,
  checksState: checksSlice.reducer,
};

export const checksMiddleware = [checksApi.middleware];
