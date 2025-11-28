import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { ReadChecksRequestDto } from "../dtos/requests/checks";
import { CheckResponseDto } from "../dtos/responses/checks/checkResponseDto";
import { setChecks } from "../features/checksSlice";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const checksApi = createApi({
  reducerPath: "checksApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Checks"],
  endpoints: (builder) => ({
    readChecks: builder.mutation<
      ApiResponseDto<CheckResponseDto[]>,
      ReadChecksRequestDto
    >({
      query: (body) => ({
        url: "Checks",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setChecks(result.data.data));
        });
      },
    }),
    getCheckContent: builder.mutation<ApiResponseDto<string>, string>({
      query: (id) => ({
        url: `Checks/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useReadChecksMutation, useGetCheckContentMutation } = checksApi;
