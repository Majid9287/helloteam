// redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default rootReducer;