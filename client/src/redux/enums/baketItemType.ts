import { SelectOption } from "../../interfaces/SelectOption";

export type BasketItemType = 0 | 1;
export const BasketItemTypeEnum = {
  Product: 0,
  Device: 1,
};
export const BasketItemTypeDisplay: { [key in BasketItemType]: string } = {
  0: "Продукт",
  1: "Расходник",
};
export const BasketItemTypeOptions: SelectOption<number>[] = [
  { label: "Продукты", value: 0 },
  { label: "Расходники", value: 1 },
];