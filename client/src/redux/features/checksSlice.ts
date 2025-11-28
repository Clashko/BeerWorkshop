import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { CheckResponseDto } from "../dtos/responses/checks/checkResponseDto";

interface ChecksState {
  checks: CheckResponseDto[];
}

const initialState: ChecksState = {
  checks: [],
};

const checksSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {
    setChecks: (state, action: PayloadAction<CheckResponseDto[]>) => {
      state.checks = action.payload;
    },
    resetChecksState: () => initialState,
  },
});

export const {
  setChecks,
  resetChecksState,
} = checksSlice.actions;

export default checksSlice;

export const selectChecks = (state: RootState) => state.checksState.checks;