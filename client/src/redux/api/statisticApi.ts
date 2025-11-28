import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { setStatistic } from "../features/statisticSlice";
import { StatisticsResponseDto } from "../dtos/responses/statistic";
import baseQueryWithReauth from "./baseQueryWithReauth";
import { StatisticRequestDto } from "../dtos/requests/statistic/StatisticRequestDto";

export const statisticApi = createApi({
  reducerPath: "statisticApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Statistic"],
  endpoints: (builder) => ({
    readStatistic: builder.mutation<
      ApiResponseDto<StatisticsResponseDto>,
      StatisticRequestDto
    >({
      query: (body) => ({
        url: "Statistics",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setStatistic(result.data.data));
        });
      },
    }),
  }),
});

export const { useReadStatisticMutation } = statisticApi;
