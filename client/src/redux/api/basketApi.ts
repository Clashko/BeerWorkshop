import { createApi } from "@reduxjs/toolkit/query/react";
import { RealizationRequestDto } from "../dtos/requests/basket";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { RealizationResponseDto } from "../dtos/responses/basket";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    realize: builder.mutation<
      ApiResponseDto<RealizationResponseDto>,
      RealizationRequestDto
    >({
      query: (body) => ({
        url: "Basket",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRealizeMutation } = basketApi;
