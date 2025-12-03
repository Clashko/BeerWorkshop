import {
  ExpirationCountingDateType,
  ExpirationMeasureType,
} from "../../../enums";

export interface CreateProductInventoryItemRequestDto {
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
  productId: string;
}
