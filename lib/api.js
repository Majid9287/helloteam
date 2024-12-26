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
    // Simply reject the promise with the error
    return Promise.reject(error);
  }
);

export const AuthService = {
  login: async (credentials) => {
    console.log(credentials)
    const response = await api.post('/api/auth/signin', credentials);
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
    console.log("response in profile",response.data)
    return response.data;
  },
  registerInitialUser: async (userData) => {
    const response = await api.post('/api/auth/signup', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber || null,
      profilePicture: userData.profilePicture || null,
      role: userData.role || 'client' // Default role if not specified
    });
    
    const { accessToken, refreshToken } = response.data;
    console.log("res",response.data)
    // Decode token to get user ID
    const decodedToken = decodeToken(accessToken);
    const userId = decodedToken?.sub || decodedToken?.id;
    console.log("userId",userId,decodedToken)
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
export const TicketService = {
  assignAgent: async (ticketId, agentId) => {
    const response = await api.put(`/api/tickets/${ticketId}/assign`, { agentId });
    return response.data.docs;
  },

  updateStatus: async (ticketId, status) => {
    const response = await api.patch(`/api/tickets/${ticketId}/status`, { status });
    return response.data.docs;
  },

  updatePriority: async (ticketId, priority) => {
    const response = await api.patch(`/api/tickets/${ticketId}/priority`, { priority });
    return response.data.docs;
  },

  getAgents: async (organizationId, page = 1, limit = 10) => {
    const response = await api.get(`/api/users/${organizationId}?role=agent&page=${page}&limit=${limit}`);
    return response.data.docs.users;
  }
};

export default api;