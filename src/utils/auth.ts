// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  sub: string;
}

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('access_token');
  
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    return decodedToken.exp > currentTime;
  } catch (error) {
    // Token is invalid or cannot be decoded
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  // Optionally redirect to login page
  window.location.href = '/login';
};