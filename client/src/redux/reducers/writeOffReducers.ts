import { writeOffApi } from "../api/writeOffApi";
import writeOffSlice from "../features/writeOffSlice";

export const writeOffReducers = {
  [writeOffApi.reducerPath]: writeOffApi.reducer,
  writeOffState: writeOffSlice.reducer,
};

export const writeOffMiddleware = [writeOffApi.middleware];
