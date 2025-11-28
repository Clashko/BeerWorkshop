import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { setUser } from "../features/userSlice";
import { UserResponseDto } from "../dtos/responses/users/UserResponseDto";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.mutation<ApiResponseDto<UserResponseDto>, void>({
      query: () => ({
        url: "Auth/GetMe",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setUser(result.data.data));
        });
      },
    }),
  }),
});

export const { useGetMeMutation } = userApi;
