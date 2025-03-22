// users.ts
import axios from "axios";

const API_URL = `${(import.meta as any).env.VITE_BACKEND_URL}/api/users` || "http://localhost:8000/api/users";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signupUser = async (userData: SignupData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};