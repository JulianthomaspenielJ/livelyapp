import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'login',
  initialState: {
    loginNumber: '',
    userDetails: {},
    signUp: false,
    signIn: false,
    token: '',
    updateData: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUpdateData: (state, action) => {
      state.updateData = action.payload;
    },
  },
});

export const {
  // setLoginPhoneNumber,
  // reSetLoginPhoneNumber,
  setUserDetails,
  setUpdateData,
  // setSignUp,
  // setSignIn,
  // resetFlags,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
