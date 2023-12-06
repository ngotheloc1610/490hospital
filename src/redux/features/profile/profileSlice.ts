import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IProfileState {
  trigger: boolean,
}

const initialState: IProfileState = {
  trigger: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setTrigger: (state, action: PayloadAction<boolean>) => {
      state.trigger = action.payload;
    },

  },
});

export const { setTrigger } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profileSlice;

export default profileSlice.reducer;
