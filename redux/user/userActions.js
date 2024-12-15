// src/redux/user/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../lib/api';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const userProfile = await AuthService.getUserProfile();
      return userProfile;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const registerUserInitial = createAsyncThunk(
    'user/registerInitial',
    async (userData, { rejectWithValue }) => {
      try {
        // Register user with role
        const response = await AuthService.registerInitialUser(userData);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
export const completeUserRegistration = createAsyncThunk(
  'user/completeRegistration',
  async ({ userId, organizationData }, { rejectWithValue }) => {
    try {
      // Second step - register organization with user ID
      const orgResponse = await AuthService.registerOrganization({
        ...organizationData,
        registeredBy: userId
      });
      
      // Fetch updated user profile after organization registration
      const userProfile = await AuthService.getUserProfile();
      
      return {
        organization: orgResponse.data,
        userProfile
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);