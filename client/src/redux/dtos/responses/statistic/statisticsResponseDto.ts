import { StatisticDeviceRowResponseDto } from "./statisticDeviceRowResponseDto";
import { StatisticProductRowResponseDto } from "./statisticProductRowResponseDto";

export interface StatisticsResponseDto {
  productsStatistic: StatisticProductRowResponseDto[];
  devicesStatistic: StatisticDeviceRowResponseDto[];
}
