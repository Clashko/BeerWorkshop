import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  CreateProductsDeliveryResponseDto,
  ProductInventoryItemResponseDto,
  ProductInventoryResponseDto,
} from "../dtos/responses/productsInventory";

interface ProductsInventoryState {
  productsInventory: ProductInventoryResponseDto[];
}

const initialState: ProductsInventoryState = {
  productsInventory: [],
};

const productsInventorySlice = createSlice({
  name: "productsInventory",
  initialState,
  reducers: {
    setProductsInventory: (
      state,
      action: PayloadAction<ProductInventoryResponseDto[]>
    ) => {
      state.productsInventory = action.payload;
    },
    addProductInventoryItem: (
      state,
      action: PayloadAction<CreateProductsDeliveryResponseDto>
    ) => {
      action.payload.inventory.flatMap((item) => {
        const index = state.productsInventory.findIndex(
          (d) => d.product.id === item.product.id
        );
        if (index !== -1) {
          state.productsInventory[index].inventoryItems = [
            ...state.productsInventory[index].inventoryItems,
            ...item.inventoryItems,
          ];
        } else {
          state.productsInventory.push(item);
        }
      });
    },
    updateProductInventoryItem: (
      state,
      action: PayloadAction<{
        productId: string;
        item: Omit<ProductInventoryItemResponseDto, "productId">;
      }>
    ) => {
      const index = state.productsInventory.findIndex(
        (d) => d.product.id === action.payload.productId
      );
      const itemIndex = state.productsInventory[index].inventoryItems.findIndex(
        (i) => i.id === action.payload.item.id
      );
      state.productsInventory[index].inventoryItems[itemIndex] =
        action.payload.item;
    },
    removeProductInventoryItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.productsInventory = state.productsInventory.map((product) => ({
        ...product,
        inventoryItems: product.inventoryItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - action.payload.quantity }
            : item
        ),
      }));
    },
    resetProductsInventoryState: () => initialState,
  },
});

export const {
  setProductsInventory,
  addProductInventoryItem,
  updateProductInventoryItem,
  removeProductInventoryItemQuantity,
  resetProductsInventoryState,
} = productsInventorySlice.actions;

export default productsInventorySlice;

export const selectProductsInventory = (state: RootState) =>
  state.productsInventoryState.productsInventory;
