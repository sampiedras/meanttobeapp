import {RootState} from '@/libraries/redux';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IMatchTutorial {
  hidden: boolean;
}

const initialState: IMatchTutorial = {
  hidden: false,
};

export const itsMatchTutorialSlice = createSlice({
  name: 'itsMatchTutorial',
  initialState,
  reducers: {
    setHiddenItsMatchTutorial: (state, action: PayloadAction<boolean>) => {
      state.hidden = action.payload;
    },
  },
});

export const {setHiddenItsMatchTutorial} = itsMatchTutorialSlice.actions;

export const selectIstMatchTutorial = (state: RootState) =>
  state.itsMatchTutorial;

export default itsMatchTutorialSlice.reducer;
