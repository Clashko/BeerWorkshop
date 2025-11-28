import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ExpiringProductResponseDto } from "../dtos/responses/writeOff";

interface WriteOffState {
  expiredProducts: ExpiringProductResponseDto[];
}

const initialState: WriteOffState = {
  expiredProducts: [],
};

const writeOffSlice = createSlice({
  name: "writeOff",
  initialState,
  reducers: {
    setExpiredProducts: (state, action: PayloadAction<ExpiringProductResponseDto[]>) => {
      state.expiredProducts = action.payload;
    },
    resetWriteOffState: () => initialState,
  },
});

export const {
  setExpiredProducts,
  resetWriteOffState,
} = writeOffSlice.actions;

export default writeOffSlice;

export const selectExpiredProducts = (state: RootState) => state.writeOffState.expiredProducts;