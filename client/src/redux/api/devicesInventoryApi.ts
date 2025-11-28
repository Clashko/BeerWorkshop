import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseDto } from "../dtos/responses/apiResponseDto";
import {
  DeviceInventoryItemResponseDto,
  DeviceInventoryResponseDto,
} from "../dtos/responses/devicesInventory";
import {
  CreateDeviceInventoryItemRequestDto,
  UpdateDeviceInventoryItemRequestDto,
} from "../dtos/requests/devicesInventory";
import {
  addDeviceInventoryItem,
  setDevicesInventory,
  updateDeviceInventoryItem,
} from "../features/devicesInventorySlice";
import { DeviceResponseDto } from "../dtos/responses/devices";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const devicesInventoryApi = createApi({
  reducerPath: "devicesInventoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["DevicesInventory"],
  endpoints: (builder) => ({
    readDevicesInventory: builder.mutation<
      ApiResponseDto<DeviceInventoryResponseDto[]>,
      void
    >({
      query: () => ({
        url: "DevicesInventory",
        method: "GET",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(setDevicesInventory(result.data.data));
        });
      },
    }),
    createDevicesInventoryItem: builder.mutation<
      ApiResponseDto<DeviceInventoryItemResponseDto>,
      {
        device: DeviceResponseDto;
        body: CreateDeviceInventoryItemRequestDto;
      }
    >({
      query: ({ body }) => ({
        url: "DevicesInventory",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(
            addDeviceInventoryItem({
              device: _args.device,
              item: result.data.data,
            })
          );
        });
      },
    }),
    updateDevicesInventoryItem: builder.mutation<
      ApiResponseDto<DeviceInventoryItemResponseDto>,
      {
        deviceId: string;
        deviceItemId: string;
        body: UpdateDeviceInventoryItemRequestDto;
      }
    >({
      query: ({ deviceItemId, body }) => ({
        url: `DevicesInventory/${deviceItemId}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(async (result) => {
          dispatch(
            updateDeviceInventoryItem({
              deviceId: _args.deviceId,
              item: result.data.data,
            })
          );
        });
      },
    }),
  }),
});

export const {
  useReadDevicesInventoryMutation,
  useCreateDevicesInventoryItemMutation,
  useUpdateDevicesInventoryItemMutation,
} = devicesInventoryApi;
