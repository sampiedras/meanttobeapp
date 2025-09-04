import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterMatch } from "@/user/data/remote/entities/userEntity";
import { RootState } from "../libraries/redux";

const initialState: FilterMatch = {
  searching: "",
  gender: "FEMALE",
  nextToken: "",
  minAge: "",
  maxAge: "",
  searchRange: "GLOBALLY",
  latitude: "",
  longitude: "",
  distance: "",
  isConfig: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterMatch>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
