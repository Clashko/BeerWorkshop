import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { ProductResponseDto } from "../dtos/responses/producs";
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
} from "../dtos/requests/products";
import {
  addProduct,
  deleteProduct,
  setProducts,
  updateProduct,
} from "../features/productsSlice";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    readProducts: builder.mutation<ApiResponseDto<ProductResponseDto[]>, void>({
      query: () => ({
        url: "Products",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setProducts(result.data.data));
        });
      },
    }),
    createProduct: builder.mutation<
      ApiResponseDto<ProductResponseDto>,
      CreateProductRequestDto
    >({
      query: (body) => ({
        url: "Products",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(addProduct(result.data.data));
        });
      },
    }),
    updateProduct: builder.mutation<
      ApiResponseDto<ProductResponseDto>,
      { id: string; body: UpdateProductRequestDto }
    >({
      query: ({ id, body }) => ({
        url: `Products/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(updateProduct(result.data.data));
        });
      },
    }),
    deleteProduct: builder.mutation<ApiResponseDto<void>, string>({
      query: (id) => ({
        url: `Products/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async () => {
          dispatch(deleteProduct(_args));
        });
      },
    }),
  }),
});

export const {
  useReadProductsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
