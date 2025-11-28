import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  StatisticDeviceRowResponseDto,
  StatisticProductRowResponseDto,
  StatisticsResponseDto,
} from "../dtos/responses/statistic";

interface StatisticState {
  productsStatistic: StatisticProductRowResponseDto[];
  devicesStatistic: StatisticDeviceRowResponseDto[];
}

const initialState: StatisticState = {
  productsStatistic: [],
  devicesStatistic: [],
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setStatistic: (
      state,
      action: PayloadAction<StatisticsResponseDto>
    ) => {
      state.productsStatistic = action.payload.productsStatistic;
      state.devicesStatistic = action.payload.devicesStatistic;
    },
    resetStatisticState: () => initialState,
  },
});

export const { setStatistic, resetStatisticState } =
  statisticSlice.actions;

export default statisticSlice;

export const selectProductsStatistic = (state: RootState) =>
  state.statisticState.productsStatistic;

export const selectDevicesStatistic = (state: RootState) =>
  state.statisticState.devicesStatistic;
