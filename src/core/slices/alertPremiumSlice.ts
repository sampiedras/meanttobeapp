import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../libraries/redux";

export interface IAlertPremium {
  visible: boolean;
}

const initialState: IAlertPremium = {
  visible: false,
};

export const alertPremiumSlice = createSlice({
  name: "alertPremium",
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = alertPremiumSlice.actions;

export const selectAlertPremium = (state: RootState) => state.alertPremium;

export default alertPremiumSlice.reducer;
