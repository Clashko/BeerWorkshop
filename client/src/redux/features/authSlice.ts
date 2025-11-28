import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { TokensResponseDto } from "../dtos/responses/users/TokensResponseDto";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokensResponseDto>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    resetTokensState: () => initialState,
  },
});

export const { setTokens, resetTokensState } = authSlice.actions;

export default authSlice;

export const selectToken = (state: RootState) => state.authState.token;
export const selectRefreshToken = (state: RootState) =>
  state.authState.refreshToken;
