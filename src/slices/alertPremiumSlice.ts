import {RootState} from '@/libraries/redux';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IAlertPremium {
  visible: boolean;
}

const initialState: IAlertPremium = {
  visible: false,
};

export const alertPremiumSlice = createSlice({
  name: 'alertPremium',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const {setVisible} = alertPremiumSlice.actions;

export const selectAlertPremium = (state: RootState) =>
  state.alertPremium;

export default alertPremiumSlice.reducer;
