import { SelectOption } from "../../interfaces/SelectOption";

export type DiscountCalculatorType = 0 | 1 | 2;
export const DiscountCalculatorTypeEnum = {
  FullDiscount: 0,
  OnlyItemDiscount: 1,
  OnlyTotalDiscount: 2
};
export const DiscountCalculatorTypeOptions: SelectOption<number>[] = [
  { label: "Считать все скидки", value: 0 },
  { label: "Только по продуктовая", value: 1 },
  { label: "Только общая скидка", value: 2 },
];