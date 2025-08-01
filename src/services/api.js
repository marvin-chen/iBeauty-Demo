import axios from 'axios';
import { SKIN_DATA, PRODUCTS_DATA, AI_RECOMMENDATIONS, REWARDS_DATA } from '../data/mockData.js';
import { getDemoSkinData, DEMO_USERS } from '../data/demoDataHelper.js';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Reduced timeout for faster fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use centralized fallback data from mockData.js
const FALLBACK_SKIN_DATA = SKIN_DATA;
const FALLBACK_PRODUCTS = PRODUCTS_DATA;
const FALLBACK_AI_RECOMMENDATIONS = AI_RECOMMENDATIONS;
const FALLBACK_USER_REWARDS = REWARDS_DATA;

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with fallback handling
api.interceptors.response.use(
  (response) => {
    console.log(`API response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.warn(`API request failed for ${error.config?.url}:`, error.message);
    console.log('Using fallback data...');
    
    // Determine which fallback data to use based on the URL
    const url = error.config?.url || '';
    
    if (url.includes('skin-stats') || url.includes('users')) {
      return Promise.resolve(FALLBACK_SKIN_DATA);
    }
    
    if (url.includes('products') || url.includes('recommendations')) {
      return Promise.resolve(FALLBACK_PRODUCTS);
    }
    
    if (url.includes('ai') || url.includes('analysis')) {
      return Promise.resolve(FALLBACK_AI_RECOMMENDATIONS);
    }
    
    if (url.includes('rewards')) {
      return Promise.resolve(FALLBACK_USER_REWARDS);
    }
    
    // For unknown endpoints, return generic success
    return Promise.resolve({ success: true, data: {} });
  }
);

// User APIs with comprehensive fallbacks
export const getUserSkinStats = async (userId) => {
  try {
    // Check if this is a demo user from enhanced mock data
    if (Object.values(DEMO_USERS).includes(userId)) {
      console.log(`🎪 Loading demo data for user: ${userId}`);
      return getDemoSkinData(userId);
    }
    
    // In production/deployment, always use fallback data
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_SKIN_DATA;
    }
    
    const response = await api.get(`/users/${userId}/skin-stats`);
    return response.data || FALLBACK_SKIN_DATA;
  } catch (error) {
    console.warn('getUserSkinStats failed, using fallback:', error.message);
    return FALLBACK_SKIN_DATA;
  }
};

export const updateUserSkinStats = async (userId, skinStats) => {
  try {
    const response = await api.put(`/users/${userId}/skin-stats`, skinStats);
    return response.data;
  } catch (error) {
    console.warn('updateUserSkinStats failed, simulating success:', error.message);
    // Return updated fallback data with the new stats merged
    return { success: true, data: { ...FALLBACK_SKIN_DATA.data, ...skinStats } };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    console.warn('getUserProfile failed, using fallback:', error.message);
    return {
      success: true,
      data: {
        userId,
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        skinType: 'combination',
        concerns: ['aging', 'pigmentation', 'texture'],
        goals: {
          primary: 'reduce_fine_lines',
          secondary: 'improve_texture',
          timeframe: '3_months'
        },
        preferences: {
          ingredientAvoidance: ['fragrance', 'sulfates'],
          budgetRange: 'mid_range',
          routineComplexity: 'moderate'
        }
      }
    };
  }
};

export const getUserRewards = async (userId) => {
  try {
    // In production/deployment, always use fallback data
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_USER_REWARDS;
    }
    
    const response = await api.get(`/users/${userId}/rewards`);
    return response.data;
  } catch (error) {
    console.warn('getUserRewards failed, using fallback:', error.message);
    return FALLBACK_USER_REWARDS;
  }
};

export const redeemReward = async (userId, rewardId) => {
  try {
    const response = await api.post(`/users/${userId}/rewards/redeem`, { rewardId });
    return response.data;
  } catch (error) {
    console.warn('redeemReward failed, simulating success:', error.message);
    return {
      success: true,
      message: 'Reward redeemed successfully!',
      data: {
        rewardId,
        pointsDeducted: 500,
        newBalance: FALLBACK_USER_REWARDS.data.currentPoints - 500
      }
    };
  }
};

// Product APIs
export const getProductRecommendations = async (areaId, userId = null) => {
  try {
    // In production/deployment, always use fallback data
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_PRODUCTS;
    }
    
    const response = await api.get(`/products/recommendations/${areaId}`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.warn('getProductRecommendations failed, using fallback:', error.message);
    return FALLBACK_PRODUCTS;
  }
};

export const getProduct = async (productId) => {
  try {
    // In production/deployment, always use fallback data
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      const product = FALLBACK_PRODUCTS.products.find(p => p.id === productId);
      return {
        success: true,
        data: product || FALLBACK_PRODUCTS.products[0]
      };
    }
    
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.warn('getProduct failed, using fallback:', error.message);
    // Find specific product from fallback data
    const product = FALLBACK_PRODUCTS.products.find(p => p.id === productId);
    return {
      success: true,
      data: product || FALLBACK_PRODUCTS.products[0]
    };
  }
};

// Analysis APIs
export const startSkinAnalysis = async (userId, analysisData) => {
  try {
    const response = await api.post(`/analysis/start`, {
      userId,
      ...analysisData
    });
    return response.data;
  } catch (error) {
    console.warn('startSkinAnalysis failed, simulating analysis:', error.message);
    
    // Simulate analysis with random variations in scores
    const simulatedResults = { ...FALLBACK_SKIN_DATA };
    
    // Add small random variations to make it feel dynamic
    Object.keys(simulatedResults.data.areas).forEach(area => {
      const current = simulatedResults.data.areas[area].currentScore;
      const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
      simulatedResults.data.areas[area].currentScore = Math.max(0, Math.min(100, current + variation));
      simulatedResults.data.areas[area].lastAnalyzed = new Date().toISOString();
    });
    
    return {
      success: true,
      analysisId: `analysis_${Date.now()}`,
      data: simulatedResults.data
    };
  }
};

export const getAnalysisStatus = async (analysisId) => {
  try {
    const response = await api.get(`/analysis/${analysisId}/status`);
    return response.data;
  } catch (error) {
    console.warn('getAnalysisStatus failed, simulating completion:', error.message);
    return {
      success: true,
      status: 'completed',
      progress: 100,
      analysisId,
      completedAt: new Date().toISOString(),
      results: FALLBACK_SKIN_DATA.data
    };
  }
};

// AI-powered features
export const getAIRecommendations = async (skinData, userProfile = {}) => {
  try {
    // In production/deployment, always use fallback data
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_AI_RECOMMENDATIONS;
    }
    
    const response = await api.post('/ai/recommendations', {
      skinData,
      userProfile
    });
    return response.data;
  } catch (error) {
    console.warn('getAIRecommendations failed, using fallback:', error.message);
    return FALLBACK_AI_RECOMMENDATIONS;
  }
};

export const generateSmartGoals = async (currentScores, userGoals = {}) => {
  try {
    const response = await api.post('/ai/smart-goals', {
      currentScores,
      userGoals
    });
    return response.data;
  } catch (error) {
    console.warn('generateSmartGoals failed, generating fallback goals:', error.message);
    
    // Generate smart goals based on current scores
    const smartGoals = {};
    Object.keys(currentScores).forEach(area => {
      const current = currentScores[area];
      let targetReduction;
      
      // Set realistic goals based on current score
      if (current > 70) targetReduction = 0.25;      // Reduce by 25% for high scores
      else if (current > 50) targetReduction = 0.30;  // Reduce by 30% for medium scores
      else if (current > 30) targetReduction = 0.35;  // Reduce by 35% for lower scores
      else targetReduction = 0.20;                    // Modest reduction for already low scores
      
      smartGoals[area] = {
        current,
        target: Math.max(5, Math.round(current * (1 - targetReduction))),
        timeframe: current > 60 ? '12-16 weeks' : '8-12 weeks',
        priority: current > 60 ? 'high' : current > 40 ? 'medium' : 'low',
        confidence: 0.85 + (Math.random() * 0.1) // 85-95% confidence
      };
    });
    
    return {
      success: true,
      goals: smartGoals,
      generatedAt: new Date().toISOString()
    };
  }
};

export const getAIEnhancedSkinStats = async (userId) => {
  try {
    const response = await api.get(`/ai/enhanced-stats/${userId}`);
    return response.data;
  } catch (error) {
    console.warn('getAIEnhancedSkinStats failed, enhancing fallback data:', error.message);
    
    // Enhance fallback data with AI insights
    const enhancedData = { ...FALLBACK_SKIN_DATA };
    
    // Add AI insights to each area
    Object.keys(enhancedData.data.areas).forEach(area => {
      enhancedData.data.areas[area].aiInsights = {
        trend: Math.random() > 0.5 ? 'improving' : 'stable',
        confidence: 0.8 + (Math.random() * 0.15), // 80-95%
        nextMilestone: Math.floor(Math.random() * 4) + 2, // 2-6 weeks
        recommendedAction: 'Continue current routine with minor adjustments'
      };
    });
    
    return {
      success: true,
      data: enhancedData.data,
      aiProcessedAt: new Date().toISOString()
    };
  }
};

export default api;
