import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getQuestions = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/cognitive/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && Array.isArray(response.data.questions)) {
      return response.data.questions;
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const submitPersonalityTest = async (questionsData: any[]) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found. Please log in.");
      }
  
      const response = await axios.post(
        `${API_URL}/cognitive/submit`, 
        { 
          questions_data: questionsData 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      return response.data;
    } catch (error) {
      // Enhanced error logging
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    }
  };

  export const getCognitiveTestStatus = async (): Promise<{
    has_completed_test: boolean;
    completed_at: string | null;
  }> => {
    try {
      const token = localStorage.getItem('access_token');
      const username = localStorage.getItem('username'); // Email saved as username
      if (!token || !username) {
        throw new Error('No access token or username found. Please log in.');
      }
  
      const response = await axios.get(`${API_URL}/cognitive/status`, {
        params: { email: username },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking cognitive test status:", error);
      throw error;
    }
  };  

// api/facial.ts
// In your services/test.ts file
interface FacialAnalysisResponse {
  scores: {
    [key: string]: number;
  };
}

export const submitFacialAnalysis = async (data: File | FormData): Promise<FacialAnalysisResponse> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found. Please log in.');
  }

  const formData = new FormData();
  if (data instanceof File) {
    formData.append('file', data);
  } else {
    // If it's already FormData, use it directly
    return axios.post(`${API_URL}/emotion/analysis`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const response = await axios.post(`${API_URL}/emotion/analysis`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getEmotionStatus = async (email: string): Promise<{
  status: string;
  data: {
    timestamp: string;
    scores: { [key: string]: number };
    type: string;
    filenames: string[];
  }[];
}> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/emotion/status`, {
      params: { email },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching emotion status:", error);
    throw error;
  }
};
