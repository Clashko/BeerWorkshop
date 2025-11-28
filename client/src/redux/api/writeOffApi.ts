import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import {
  ExpiringProductResponseDto,
  WriteOffResponseDto,
} from "../dtos/responses/writeOff";
import {
  resetWriteOffState,
  setExpiredProducts,
} from "../features/writeOffSlice";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const writeOffApi = createApi({
  reducerPath: "writeOffApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["WriteOff"],
  endpoints: (builder) => ({
    readExpiredProducts: builder.mutation<
      ApiResponseDto<ExpiringProductResponseDto[]>,
      void
    >({
      query: () => ({
        url: "WriteOff",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setExpiredProducts(result.data.data));
        });
      },
    }),
    deleteExpiredProducts: builder.mutation<
      ApiResponseDto<WriteOffResponseDto>,
      string[]
    >({
      query: (body) => ({
        url: "WriteOff",
        method: "DELETE",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async () => {
          dispatch(resetWriteOffState());
        });
      },
    }),
  }),
});

export const {
  useReadExpiredProductsMutation,
  useDeleteExpiredProductsMutation,
} = writeOffApi;
