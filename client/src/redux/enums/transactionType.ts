export type TransactionType = 0 | 1 | 2;
export const TransactionTypeEnum = {
  Arrival: 0,
  Sale: 1,
  WriteOff: 2,
};

export const TransactionTypeDisplay: { [key in TransactionType]: string } = {
  0: "Приход",
  1: "Продажа",
  2: "Списание",
};
