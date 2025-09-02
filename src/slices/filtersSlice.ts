import {EPreferenceLocation} from '@/api/user/entities/userEntity';
import {RootState} from '@/libraries/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, PayloadAction, createSlice} from '@reduxjs/toolkit';

interface FiltersState {
  filterAge: [number, number];
  ageChecked: boolean;
  distanceChecked: boolean;
  distance: number;
  searchingId: string;
  isNearMe: boolean;
}

const initialState: FiltersState = {
  filterAge: [18, 80],
  ageChecked: false,
  distanceChecked: false,
  distance: 5,
  searchingId: '',
  isNearMe: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      AsyncStorage.setItem('filters', JSON.stringify(action.payload));
      return {...state, ...action.payload};
    },
    loadFilters: (state, action) => {
      return {...state, ...action.payload};
    },
  },
});

export const {setFilters, loadFilters} = filtersSlice.actions;

export const loadFiltersAsync = () => async (dispatch: any) => {
  try {
    const filtersString = await AsyncStorage.getItem('filters');
    const filters = filtersString ? JSON.parse(filtersString) : initialState;
    dispatch(loadFilters(filters));
  } catch (error) {
    // TODO: handle error
  }
};

export const selectFilters = (state: RootState) => state.filters;
export default filtersSlice.reducer;
