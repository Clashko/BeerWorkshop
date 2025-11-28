import { ProductType, TransactionType } from "../../../enums";

export interface StatisticProductRowResponseDto {
  name: string;
  productType: ProductType;
  transactionType: TransactionType;
  quantity: number;
  price: number;
  discount: string;
  totalAmount: number;
  transactionDate: Date;
}
