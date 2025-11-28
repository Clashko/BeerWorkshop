import { TransactionType } from "../../../enums";
import { CheckItemResponseDto } from "./checkItemResponseDto";

export interface CheckResponseDto {
  id: string;
  orderNumber: number;
  totalAmount: number;
  transactionType: TransactionType;
  transactionDate: Date;

  checkItems: CheckItemResponseDto[];
}
