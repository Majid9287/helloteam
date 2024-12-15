// src/redux/auth/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../lib/api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Login and get decoded token info
      const decodedTokenInfo = await AuthService.login(credentials);
      
      // Fetch user profile
      const userProfile = await AuthService.getUserProfile();
      
      // Merge token info with user profile
      return {
        ...decodedTokenInfo,
        ...userProfile,
        role: userProfile.role // Ensure role is included
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      AuthService.logout();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);