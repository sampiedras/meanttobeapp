import {RootState} from '@/libraries/redux';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface ITutorialMatchSlice {
  showTutorial: boolean;
}

const initialState: ITutorialMatchSlice = {
  showTutorial: false,
};

export const tutorialMatchSlice = createSlice({
  name: 'tutorialMatch',
  initialState,
  reducers: {
    setShowTutorial: (state, action: PayloadAction<boolean>) => {
      state.showTutorial = action.payload;
    },
  },
});

export const {setShowTutorial} = tutorialMatchSlice.actions;

export const selectTutorialMatch = (state: RootState) => state.tutorialMatch;

export default tutorialMatchSlice.reducer;
