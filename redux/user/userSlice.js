// src/redux/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchUserProfile, 
  registerUserInitial,
  completeUserRegistration 
} from './userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    registrationStep: null,
    loading: false,
    error: null,
    userId: null,
    organization: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Profile Cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.error.message;
      })
      
      // Initial Registration Cases
      .addCase(registerUserInitial.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationStep = 1;
      })
      .addCase(registerUserInitial.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.registrationStep = 2;
        state.error = null;
      })
      .addCase(registerUserInitial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.registrationStep = null;
      })
      
      // Complete Registration Cases
      .addCase(completeUserRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeUserRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.userProfile;
        state.organization = action.payload.organization;
        state.registrationStep = null;
        state.error = null;
      })
      .addCase(completeUserRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.registrationStep = 2;
      });
  }
});

export default userSlice.reducer;