import { userApi } from "../api/userApi";
import userSlice from "../features/userSlice";

export const userReducers = {
  [userApi.reducerPath]: userApi.reducer,
  userState: userSlice.reducer,
};

export const userMiddleware = [userApi.middleware];
