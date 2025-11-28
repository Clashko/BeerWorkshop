import { ExpirationCountingDateType, ExpirationMeasureType } from "../../../enums";

export interface ProductInventoryItemResponseDto {
  id: string;
  quantity: number;
  incomingDate: Date;
  purchasePrice: number;
  retailPrice: number;
  manufactureDate: Date;
  expirationTime: number;
  expirationMeasure: ExpirationMeasureType;
  openingDate?: Date;
  expirationCountingDateType: ExpirationCountingDateType 
}
