import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  salesData: [],
  serviceData: [],
  inventoryData: [],
  essData: [],
};

export const bottomNavSlice = createSlice({
  name: 'BottomNav',
  initialState,
  reducers: {
    setBottomNavList: (state, action) => {
      const {salesData, serviceData, inventoryData, essData} = action.payload;
      state.salesData = salesData;
      state.serviceData = serviceData;
      state.inventoryData = inventoryData;
      state.essData = essData;
    },
    setSalesData: (state, action) => {
      state.salesData = action.payload;
    },
    setServiceData: (state, action) => {
      state.serviceData = action.payload;
    },
    setinventoryData: (state, action) => {
      state.inventoryData = action.inventoryData;
    },
    setEssData: (state, action) => {
      state.essData = action.payload;
    },
  },
});

export const {
  setBottomNavList,
  setSalesData,
  setServiceData,
  setinventoryData,
  setEssData,
} = bottomNavSlice.actions;

export default bottomNavSlice.reducer;
