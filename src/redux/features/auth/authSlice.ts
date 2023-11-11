import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAuthState {
  isLogin: boolean,
  id: string,
}

const initialState: IAuthState = {
  isLogin: false,
  id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setLogin, setId } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authSlice;

export default authSlice.reducer;
