import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import {
  CreateProductsDeliveryResponseDto,
  ProductInventoryItemResponseDto,
  ProductInventoryResponseDto,
} from "../dtos/responses/productsInventory";
import {
  CreateProductsDeliveryRequestDto,
  UpdateProductInventoryItemRequestDto,
} from "../dtos/requests/productsInventory";
import {
  addProductInventoryItem,
  setProductsInventory,
  updateProductInventoryItem,
} from "../features/productsInventorySlice";
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
      ApiResponseDto<CreateProductsDeliveryResponseDto>,
      CreateProductsDeliveryRequestDto[]
    >({
      query: (body) => ({
        url: "ProductsInventory",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(addProductInventoryItem(result.data.data));
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
