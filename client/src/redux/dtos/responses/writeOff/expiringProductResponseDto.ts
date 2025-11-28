import { ProductResponseDto } from "../producs";
import { ExpiringProductInventoryItemResponseDto } from "./expiringProductInventoryItemResponseDto";

export interface ExpiringProductResponseDto {
  product: ProductResponseDto;
  expiringItems: ExpiringProductInventoryItemResponseDto[];
}
