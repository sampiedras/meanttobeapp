import {RootState} from '@/libraries/redux';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IMatch {
  hidden: boolean;
  imgUserTwo: string;
  channelId: string;
}

const initialState: IMatch = {
  hidden: false,
  imgUserTwo: '',
  channelId: '',
};

export const itsMatchModalSlice = createSlice({
  name: 'itsMatch',
  initialState,
  reducers: {
    setHiddenItsMatch: (state, action: PayloadAction<boolean>) => {
      state.hidden = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.imgUserTwo = action.payload;
    },
    setChannelId: (state, action: PayloadAction<string>) => {
      state.channelId = action.payload;
    },
  },
});

export const {setHiddenItsMatch, setImg, setChannelId} =
  itsMatchModalSlice.actions;

export const selectIstMatch = (state: RootState) => state.itsMatch;

export default itsMatchModalSlice.reducer;
