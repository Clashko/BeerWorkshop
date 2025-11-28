import { SelectOption } from "../../interfaces/SelectOption";

export type ProductType = 0 | 1;
export const ProductTypeEnum = {
  Drink: 0,
  Food: 1,
};
export const ProductTypeDisplay: { [key in ProductType]: string } = {
  0: "Напитки",
  1: "Еда",
};
export const ProductTypeOptions: SelectOption<number>[] = [
  { label: "Напитки", value: 0 },
  { label: "Еда", value: 1 },
];