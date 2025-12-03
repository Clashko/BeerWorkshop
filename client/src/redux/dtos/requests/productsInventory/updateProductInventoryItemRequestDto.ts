import {
  ExpirationCountingDateType,
  ExpirationMeasureType,
} from "../../../enums";

export interface UpdateProductInventoryItemRequestDto {
  quantity: number;
  incomingDate: Date;
  purchasePrice: number;
  purchaseVat: number;
  retailPrice: number;
  pricePerQuantity: number;
  manufactureDate: Date;
  expirationTime: number;
  expirationMeasure: ExpirationMeasureType;
  openingDate?: Date | null;
  expirationCountingDateType: ExpirationCountingDateType;
}
