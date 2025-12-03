import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  CreateDevicesDeliveryResponseDto,
  DeviceInventoryItemResponseDto,
  DeviceInventoryResponseDto,
} from "../dtos/responses/devicesInventory";

interface DevicesInventoryState {
  devicesInventory: DeviceInventoryResponseDto[];
}

const initialState: DevicesInventoryState = {
  devicesInventory: [],
};

const devicesInventorySlice = createSlice({
  name: "devicesInventory",
  initialState,
  reducers: {
    setDevicesInventory: (
      state,
      action: PayloadAction<DeviceInventoryResponseDto[]>
    ) => {
      state.devicesInventory = action.payload;
    },
    addDeviceInventoryItem: (
      state,
      action: PayloadAction<CreateDevicesDeliveryResponseDto>
    ) => {
      action.payload.inventory.flatMap((item) => {
        const index = state.devicesInventory.findIndex(
          (d) => d.device.id === item.device.id
        );
        if (index !== -1) {
          state.devicesInventory[index].inventoryItems = [
            ...state.devicesInventory[index].inventoryItems,
            ...item.inventoryItems,
          ];
        } else {
          state.devicesInventory.push(item);
        }
      });
    },
    updateDeviceInventoryItem: (
      state,
      action: PayloadAction<{
        deviceId: string;
        item: Omit<DeviceInventoryItemResponseDto, "deviceId">;
      }>
    ) => {
      const index = state.devicesInventory.findIndex(
        (d) => d.device.id === action.payload.deviceId
      );
      const itemIndex = state.devicesInventory[index].inventoryItems.findIndex(
        (i) => i.id === action.payload.item.id
      );
      state.devicesInventory[index].inventoryItems[itemIndex] =
        action.payload.item;
    },
    removeDeviceInventoryItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.devicesInventory = state.devicesInventory.map((device) => ({
        ...device,
        inventoryItems: device.inventoryItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - action.payload.quantity }
            : item
        ),
      }));
    },
    resetDevicesInventoryState: () => initialState,
  },
});

export const {
  setDevicesInventory,
  addDeviceInventoryItem,
  updateDeviceInventoryItem,
  removeDeviceInventoryItemQuantity,
  resetDevicesInventoryState,
} = devicesInventorySlice.actions;

export default devicesInventorySlice;

export const selectDevicesInventory = (state: RootState) =>
  state.devicesInventoryState.devicesInventory;
