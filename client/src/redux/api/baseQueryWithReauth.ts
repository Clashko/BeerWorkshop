/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";
import { TokensResponseDto } from "../dtos/responses/users/TokensResponseDto";
import { toast } from "react-toastify";
import { resetTokensState, setTokens } from "../features/authSlice";
import { resetUserState } from "../features/userSlice";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const token = state.authState.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as any).status === 401) {
    try {
      const state = api.getState() as RootState;

      const response = await baseQuery(
        {
          url: "Auth/RefreshToken",
          method: "POST",
          body: {
            token: state.authState.token,
            refreshToken: state.authState.refreshToken,
          },
        },
        api,
        extraOptions
      );

      if (response.data) {
        const refreshResponse =
          response.data as ApiResponseDto<TokensResponseDto>;
        api.dispatch(setTokens(refreshResponse.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        if (response.error?.status === 400) {
          toast.warn(
            "RefreshToken просрочен либо не действителен, пройдите процесс авторизации"
          );
        }
        api.dispatch(resetTokensState());
        api.dispatch(resetUserState());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return result;
};

export default baseQueryWithReauth;
