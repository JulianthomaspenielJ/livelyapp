import {createSlice} from '@reduxjs/toolkit';

export const buttonSlice = createSlice({
  name: 'button',
  initialState: {
    clicked: false,
    activeTitle: '',
  },
  reducers: {
    setClicked: (state, action) => {
      state.clicked = action.payload;
    },
    setActiveTitle: (state, action) => {
      state.activeTitle = action.payload;
    },
  },
});

export const {setClicked, setActiveTitle} = buttonSlice.actions;

export default buttonSlice.reducer;
