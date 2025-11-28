import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceResponseDto } from "../dtos/responses/devices";
import { RootState } from "../store/store";

interface DevicesState {
  devices: DeviceResponseDto[];
}

const initialState: DevicesState = {
  devices: [],
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<DeviceResponseDto[]>) => {
      state.devices = action.payload;
    },
    addDevice: (state, action: PayloadAction<DeviceResponseDto>) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<DeviceResponseDto>) => {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
      state.devices.push(action.payload);
    },
    deleteDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
    },
    resetDevicesState: () => initialState,
  },
});

export const {
  setDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  resetDevicesState,
} = devicesSlice.actions;

export default devicesSlice;

export const selectDevices = (state: RootState) => state.devicesState.devices;