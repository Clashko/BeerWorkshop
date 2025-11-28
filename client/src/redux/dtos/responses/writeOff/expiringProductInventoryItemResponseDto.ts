import {
  ExpirationCountingDateType,
  ExpirationMeasureType,
} from "../../../enums";

export interface ExpiringProductInventoryItemResponseDto {
  id: string;
  quantity: number;
  incomingDate: Date;
  manufactureDate: Date;
  openingDate?: Date;
  expirationTime: number;
  expirationMeasure: ExpirationMeasureType;
  expirationCountingDateType: ExpirationCountingDateType;
}
