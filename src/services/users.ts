import axios from "axios";

const API_URL = "http://localhost:8000/api/users/login";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
