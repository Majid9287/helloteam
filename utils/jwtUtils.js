import { jwtDecode } from "jwt-decode";

const decode = (token) => {
  if (typeof jwtDecode !== 'function' && typeof jwtDecode.default === 'function') {
    return jwtDecode.default(token);
  } else if (typeof jwtDecode === 'function') {
    return jwtDecode(token);
  }
  throw new Error('jwt-decode is not a function');
};

export const decodeToken = (token) => {
  console.log("Decoding token:", token);
  try {
    const decoded = decode(token);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = decode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

export const getTokenRemainingTime = (token) => {
  if (!token) return 0;
  
  try {
    const decoded = decode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime;
  } catch (error) {
    console.error('Error getting token remaining time:', error);
    return 0;
  }
};

