// utils/jwtUtils.js
import jwtDecode from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const getTokenRemainingTime = (token) => {
  if (!token) return 0;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime;
  } catch (error) {
    return 0;
  }
};