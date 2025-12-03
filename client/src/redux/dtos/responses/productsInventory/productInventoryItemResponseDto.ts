import {
  ExpirationCountingDateType,
  ExpirationMeasureType,
} from "../../../enums";

export interface ProductInventoryItemResponseDto {
  id: string;
  quantity: number;
  incomingDate: Date;
  purchasePrice: number;
  purchaseVat: number;
  retailPrice: number;
  pricePerQuantity: number;
  manufactureDate: Date;
  expirationTime: number;
  expirationMeasure: ExpirationMeasureType;
  openingDate?: Date;
  expirationCountingDateType: ExpirationCountingDateType;
}
