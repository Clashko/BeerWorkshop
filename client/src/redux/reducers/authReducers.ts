import { authApi } from "../api/authApi";
import authSlice from "../features/authSlice";

export const authReducers = {
  [authApi.reducerPath]: authApi.reducer,
  authState: authSlice.reducer,
};

export const authMiddleware = [authApi.middleware];
