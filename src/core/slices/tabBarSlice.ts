import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../libraries/redux";

export interface ITabBarSlice {
  show: boolean;
}

const initialState: ITabBarSlice = {
  show: false,
};

export const tabBarSlice = createSlice({
  name: "tabBar",
  initialState,
  reducers: {
    setShowTabBar: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { setShowTabBar } = tabBarSlice.actions;

export const selectTabBar = (state: RootState) => state.tabBar;

export default tabBarSlice.reducer;
