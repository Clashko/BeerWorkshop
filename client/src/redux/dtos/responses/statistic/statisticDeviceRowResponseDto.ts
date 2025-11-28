import { TransactionType } from "../../../enums";

export interface StatisticDeviceRowResponseDto {
  name: string;
  transactionType: TransactionType;
  quantity: number;
  price: number;
  discount: string;
  totalAmount: number;
  transactionDate: Date;
}
