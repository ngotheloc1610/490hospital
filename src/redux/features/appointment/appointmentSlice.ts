import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAuthState {
  triggerCancel: boolean,
}

const initialState: IAuthState = {
  triggerCancel: false,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setTriggerCancel: (state, action: PayloadAction<boolean>) => {
      state.triggerCancel = action.payload;
    },

  },
});

export const { setTriggerCancel } = appointmentSlice.actions;

export const selectAppointment = (state: RootState) => state.appointmentSlice;

export default appointmentSlice.reducer;
