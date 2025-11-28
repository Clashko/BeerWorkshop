import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { UserResponseDto } from "../dtos/responses/users/UserResponseDto";

interface UserState {
  user: UserResponseDto | null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponseDto>) => {
      state.user = action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const { setUser, resetUserState } = userSlice.actions;

export default userSlice;

export const selectUser = (state: RootState) => state.userState.user;