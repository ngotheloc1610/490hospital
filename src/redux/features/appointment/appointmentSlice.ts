import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAuthState {
  triggerCancel: boolean,
  idAppointment: string,
}

const initialState: IAuthState = {
  triggerCancel: false,
  idAppointment: "",
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setTriggerCancel: (state, action: PayloadAction<boolean>) => {
      state.triggerCancel = action.payload;
    },
    setIdAppointment: (state, action: PayloadAction<string>) => {
      state.idAppointment = action.payload;
    },

  },
});

export const { setTriggerCancel, setIdAppointment } = appointmentSlice.actions;

export const selectAppointment = (state: RootState) => state.appointmentSlice;

export default appointmentSlice.reducer;
