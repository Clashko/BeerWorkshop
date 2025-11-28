import { SelectOption } from "../../interfaces/SelectOption";

export type UnitOfMeasureType = 0 | 1 | 2 | 3;
export const UnitOfMeasureTypeEnum = {
  Piece: 0,
  Gram: 1,
  Kilogram: 2,
  Liter: 3,
};
export const UnitOfMeasureDisplay: { [key in UnitOfMeasureType]: string } = {
  0: "Штуки",
  1: "Граммы",
  2: "Килограммы",
  3: "Литры",
};
export const UnitOfMeasureTableDisplay: { [key in UnitOfMeasureType]: string } =
  {
    0: "шт.",
    1: "гр.",
    2: "кг.",
    3: "л.",
  };
export const UnitOfMeasureOptions: SelectOption<number>[] = [
  { label: "Штуки", value: 0 },
  { label: "Граммы", value: 1 },
  { label: "Килограммы", value: 2 },
  { label: "Литры", value: 3 },
];
