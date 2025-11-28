import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { TokensResponseDto } from "../dtos/responses/users/TokensResponseDto";
import {
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
} from "../dtos/requests/users";
import { resetTokensState, setTokens } from "../features/authSlice";
import { resetUserState } from "../features/userSlice";
import { userApi } from "./userApi";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponseDto<TokensResponseDto>, LoginRequestDto>(
      {
        query: (body) => ({
          url: "Auth/Login",
          method: "POST",
          body,
        }),
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          await queryFulfilled.then(async (result) => {
            dispatch(setTokens(result.data.data));
            await dispatch(userApi.endpoints.getMe.initiate());
          });
        },
      }
    ),
    register: builder.mutation<ApiResponseDto<void>, RegisterRequestDto>({
      query: (body) => ({
        url: "Auth/Register",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.mutation<
      ApiResponseDto<TokensResponseDto>,
      RefreshTokenRequestDto
    >({
      query: (body) => ({
        url: "Auth/RefreshToken",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setTokens(result.data.data));
        });
      },
    }),
    revokeToken: builder.mutation<ApiResponseDto<void>, void>({
      query: () => ({
        url: "Auth/RevokeToken",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async () => {
          dispatch(resetTokensState());
          dispatch(resetUserState());
        });
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useRevokeTokenMutation,
} = authApi;
