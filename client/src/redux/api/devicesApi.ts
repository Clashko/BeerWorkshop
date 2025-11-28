import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import { DeviceResponseDto } from "../dtos/responses/devices";
import {
  CreateDeviceRequestDto,
  UpdateDeviceRequestDto,
} from "../dtos/requests/devices";
import {
  addDevice,
  setDevices,
  updateDevice,
  deleteDevice,
} from "../features/devicesSlice";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Devices"],
  endpoints: (builder) => ({
    readDevices: builder.mutation<ApiResponseDto<DeviceResponseDto[]>, void>({
      query: () => ({
        url: "Devices",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setDevices(result.data.data));
        });
      },
    }),
    createDevice: builder.mutation<
      ApiResponseDto<DeviceResponseDto>,
      CreateDeviceRequestDto
    >({
      query: (body) => ({
        url: "Devices",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(addDevice(result.data.data));
        });
      },
    }),
    updateDevice: builder.mutation<
      ApiResponseDto<DeviceResponseDto>,
      { id: string; body: UpdateDeviceRequestDto }
    >({
      query: ({ id, body }) => ({
        url: `Devices/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(updateDevice(result.data.data));
        });
      },
    }),
    deleteDevice: builder.mutation<ApiResponseDto<void>, string>({
      query: (id) => ({
        url: `Devices/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async () => {
          dispatch(deleteDevice(_args));
        });
      },
    }),
  }),
});

export const {
  useReadDevicesMutation,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = devicesApi;
