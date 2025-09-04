import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../libraries/redux";

export interface IMatchSlice {
  show: boolean;
  channelId: string;
}

const initialState: IMatchSlice = {
  show: false,
  channelId: "",
};

export const matchSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setChannelId: (state, action: PayloadAction<string>) => {
      state.channelId = action.payload;
    },
  },
});

export const { setShow, setChannelId } = matchSlice.actions;

export const selectMatch = (state: RootState) => state.match;

export default matchSlice.reducer;
