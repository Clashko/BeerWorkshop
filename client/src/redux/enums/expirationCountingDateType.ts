import { SelectOption } from "../../interfaces/SelectOption";

export type ExpirationCountingDateType = 0 | 1;
export const ExpirationCountingDateTypeEnum = {
  ManufactureDate: 0,
  OpeningDate: 1,
};
export const ExpirationCountingDateTypeDisplay: {
  [key in ExpirationCountingDateType]: string;
} = {
  0: "От даты производства",
  1: "От даты вскрытия",
};
export const ExpirationCountingDateTypeOptions: SelectOption<number>[] = [
  { label: "От даты производства", value: 0 },
  { label: "От даты вскрытия", value: 1 },
];
