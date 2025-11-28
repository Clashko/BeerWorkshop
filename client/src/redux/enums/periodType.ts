import { SelectOption } from "../../interfaces/SelectOption";

export type PeriodType = 0 | 1;
export const PeriodTypeEnum = {
  Day: 0,
  Period: 1,
};
export const PeriodTypeOptions: SelectOption<number>[] = [
  { label: "За день", value: 0 },
  { label: "За период", value: 1 },
];