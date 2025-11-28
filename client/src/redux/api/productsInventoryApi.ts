import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import {
  ProductInventoryItemResponseDto,
  ProductInventoryResponseDto,
} from "../dtos/responses/productsInventory";
import {
  CreateProductInventoryItemRequestDto,
  UpdateProductInventoryItemRequestDto,
} from "../dtos/requests/productsInventory";
import {
  addProductInventoryItem,
  setProductsInventory,
  updateProductInventoryItem,
} from "../features/productsInventorySlice";
import { ProductResponseDto } from "../dtos/responses/producs";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const productsInventoryApi = createApi({
  reducerPath: "productsInventoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ProductsInventoryApi"],
  endpoints: (builder) => ({
    readProductsInventory: builder.mutation<
      ApiResponseDto<ProductInventoryResponseDto[]>,
      void
    >({
      query: () => ({
        url: "ProductsInventory",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setProductsInventory(result.data.data));
        });
      },
    }),
    createProductsInventoryItem: builder.mutation<
      ApiResponseDto<ProductInventoryItemResponseDto>,
      {
        product: ProductResponseDto;
        body: CreateProductInventoryItemRequestDto;
      }
    >({
      query: ({ body }) => ({
        url: "ProductsInventory",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(
            addProductInventoryItem({
              product: _args.product,
              item: result.data.data,
            })
          );
        });
      },
    }),
    updateProductsInventoryItem: builder.mutation<
      ApiResponseDto<ProductInventoryItemResponseDto>,
      {
        productId: string;
        productItemId: string;
        body: UpdateProductInventoryItemRequestDto;
      }
    >({
      query: ({ productItemId, body }) => ({
        url: `ProductsInventory/${productItemId}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(
            updateProductInventoryItem({
              productId: _args.productId,
              item: result.data.data,
            })
          );
        });
      },
    }),
  }),
});

export const {
  useReadProductsInventoryMutation,
  useCreateProductsInventoryItemMutation,
  useUpdateProductsInventoryItemMutation,
} = productsInventoryApi;
