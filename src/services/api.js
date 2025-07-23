import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle authentication errors
      localStorage.removeItem('authToken');
      // Optionally redirect to login
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', errorMessage);
    
    return Promise.reject(new Error(errorMessage));
  }
);

// User APIs
export const getUserSkinStats = async (userId) => {
  try {
    const data = await api.get(`/users/${userId}/skin-stats`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user skin stats: ${error.message}`);
  }
};

export const updateUserSkinStats = async (userId, skinStats) => {
  try {
    const data = await api.post(`/users/${userId}/skin-stats`, skinStats);
    return data;
  } catch (error) {
    throw new Error(`Failed to update user skin stats: ${error.message}`);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const data = await api.get(`/users/${userId}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }
};

// Rewards APIs
export const getUserRewards = async (userId) => {
  try {
    const data = await api.get(`/users/${userId}/rewards`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user rewards: ${error.message}`);
  }
};

export const redeemReward = async (userId, rewardId) => {
  try {
    const data = await api.post(`/users/${userId}/rewards/${rewardId}/redeem`);
    return data;
  } catch (error) {
    throw new Error(`Failed to redeem reward: ${error.message}`);
  }
};

// Products APIs
export const getProductRecommendations = async (areaId, userId = null) => {
  try {
    const params = userId ? { userId } : {};
    const data = await api.get(`/products/recommendations/${areaId}`, { params });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch product recommendations: ${error.message}`);
  }
};

export const getProduct = async (productId) => {
  try {
    const data = await api.get(`/products/${productId}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};

// Analysis APIs
export const startSkinAnalysis = async (userId, analysisData) => {
  try {
    const data = await api.post(`/analysis/start`, { userId, ...analysisData });
    return data;
  } catch (error) {
    throw new Error(`Failed to start skin analysis: ${error.message}`);
  }
};

export const getAnalysisStatus = async (analysisId) => {
  try {
    const data = await api.get(`/analysis/${analysisId}/status`);
    return data;
  } catch (error) {
    throw new Error(`Failed to get analysis status: ${error.message}`);
  }
};

// Export the axios instance for custom requests
export default api;
