import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    contactList: [],
    filterData: [],
    lastVisitedPage: '',
  },
  reducers: {
    setContactList: (state, action) => {
      state.contactList = action.payload;
    },
    setLastVisitedPage: (state, action) => {
      state.lastVisitedPage = action.payload;
    },
  },
});

export const {setContactList, setLastVisitedPage} = appSlice.actions;

export default appSlice.reducer;
