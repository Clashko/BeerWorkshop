import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ProductResponseDto } from "../dtos/responses/producs";

interface ProductsState {
  products: ProductResponseDto[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductResponseDto[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductResponseDto>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductResponseDto>) => {
      const index = state.products.findIndex((d) => d.id === action.payload.id);
      console.log(index);
      if (index !== -1) {
        state.products[index] = action.payload;
      } else state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((d) => d.id !== action.payload);
    },
    resetProductsState: () => initialState,
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProductsState,
} = productsSlice.actions;

export default productsSlice;

export const selectProducts = (state: RootState) =>
  state.productsState.products;
