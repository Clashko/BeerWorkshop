import { SelectOption } from "../../interfaces/SelectOption";

export type ExpirationMeasureType = 0 | 1 | 2;
export const ExpirationMeasureTypeEnum = {
  Hours: 0,
  Days: 1,
  Month: 2,
};
export const ExpirationMeasureTypeDisplay: {
  [key in ExpirationMeasureType]: string;
} = {
  0: "Часы",
  1: "Дни",
  2: "Месяцы",
};
export const ExpirationMeasureTypeTableDisplay: {
  [key in ExpirationMeasureType]: string;
} = {
  0: "Часов",
  1: "Дней",
  2: "Месяцев",
};
export const ExpirationMeasureTypeOptions: SelectOption<number>[] = [
  { label: "Часы", value: 0 },
  { label: "Дни", value: 1 },
  { label: "Месяцы", value: 2 },
];
