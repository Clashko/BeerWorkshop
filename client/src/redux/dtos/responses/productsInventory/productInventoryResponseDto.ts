import { ProductResponseDto } from "../producs";
import { ProductInventoryItemResponseDto } from "./productInventoryItemResponseDto";

export interface ProductInventoryResponseDto {
  product: ProductResponseDto;
  inventoryItems: ProductInventoryItemResponseDto[];
}
