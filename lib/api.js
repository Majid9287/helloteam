// src/lib/api.js
import axios from 'axios';
import { TokenService } from './tokenService';
import { decodeToken, isTokenExpired } from '../utils/jwtUtils';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL||"https://helloteam-backend.vercel.app/"
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers = { 
        'Authorization': `Bearer ${token}`,
        ...config.headers 
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    
    // If the error is due to unauthorized access and we haven't retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Check if refresh token exists and is valid
      const refreshToken = TokenService.getRefreshToken();
      
      if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          // Call refresh token endpoint
          const response = await axios.post('/api/auth/refresh', { 
            refreshToken 
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Update tokens
          TokenService.setAccessToken(accessToken);
          TokenService.setRefreshToken(newRefreshToken);
          
          // Retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, logout user
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const AuthService = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    const { accessToken, refreshToken } = response.data;
    
    // Decode token to get user info
    const decodedToken = decodeToken(accessToken);
    
    // Set tokens
    TokenService.setAccessToken(accessToken);
    TokenService.setRefreshToken(refreshToken);
    
    return decodedToken;
  },
  
  logout: () => {
    TokenService.removeTokens();
  },
  
  getUserProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },
  registerInitialUser: async (userData) => {
    const response = await api.post('/api/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber || null,
      profilePicture: userData.profilePicture || null,
      role: userData.role || 'client' // Default role if not specified
    });
    
    const { accessToken, refreshToken } = response.data;
    
    // Decode token to get user ID
    const decodedToken = decodeToken(accessToken);
    const userId = decodedToken?.sub || decodedToken?.id;
    
    // Set tokens
    TokenService.setAccessToken(accessToken);
    TokenService.setRefreshToken(refreshToken);
    
    return {
      accessToken,
      refreshToken,
      userId
    };
  },

  registerOrganization: async (organizationData) => {
    // Ensure we have an access token before making this call
    const token = TokenService.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await api.post('/api/organization/register', organizationData);
    return response;
  },

};

export default api;