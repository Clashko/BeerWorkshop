import { CreateProductInventoryItemRequestDto } from "./createProductInventoryItemRequestDto";

export interface CreateProductsDeliveryRequestDto {
  productId: string;
  items: CreateProductInventoryItemRequestDto[];
}
