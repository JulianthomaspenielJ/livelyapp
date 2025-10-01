import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from './Api/authApi';
import {authSlice} from './Slice/authSlice';
import {bottomNavSlice} from './Slice/BottomNavSlice';
import {buttonSlice} from './Slice/buttonSlice';
import {appSlice} from './Slice/appSlice';


const reducer = combineReducers({
  login: authSlice.reducer,
  BottomNav: bottomNavSlice.reducer,
  button: buttonSlice.reducer,
  app: appSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
// serviceReportApi
const store = configureStore({
  reducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApi.middleware,
    ),
});

export default store;
