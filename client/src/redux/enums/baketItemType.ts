export type BasketItemType = 0 | 1;
export const BasketItemTypeEnum = {
  Product: 0,
  Device: 1,
};
export const BasketItemTypeDisplay: { [key in BasketItemType]: string } = {
  0: "Продукт",
  1: "Расходник",
};