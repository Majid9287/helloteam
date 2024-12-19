//lib/tokenService.js
import Cookies from 'js-cookie';

export const TokenService = {
  getAccessToken: () => Cookies.get('accessToken'),
  getRefreshToken: () => Cookies.get('refreshToken'),
  
  setAccessToken: (token) => {
    Cookies.set('accessToken', token, { 
      expires: 11/24, // 1 hour
      secure: process.env.NODE_ENV === 'production' 
    });
  },
  
  setRefreshToken: (token) => {
    Cookies.set('refreshToken', token, { 
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production' 
    });
  },
  
  removeTokens: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
};