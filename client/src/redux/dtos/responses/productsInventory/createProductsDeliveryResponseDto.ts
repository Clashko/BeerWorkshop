import { ProductInventoryResponseDto } from "./productInventoryResponseDto";

export interface CreateProductsDeliveryResponseDto{
    inventory: ProductInventoryResponseDto[];
    checkContent: string;
    totalAmount: number;
}