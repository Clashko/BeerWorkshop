import { statisticApi } from "../api/statisticApi";
import statisticSlice from "../features/statisticSlice";

export const statisticReducers = {
  [statisticApi.reducerPath]: statisticApi.reducer,
  statisticState: statisticSlice.reducer,
};

export const statisticMiddleware = [statisticApi.middleware];
