import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
