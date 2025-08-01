import axios from 'axios';
import { SKIN_DATA, PRODUCTS_DATA, AI_RECOMMENDATIONS, REWARDS_DATA } from '../data/mockData.js';

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
        // API Functions
    }
  }
};

const FALLBACK_PRODUCTS = {
  success: true,
  products: [
    {
      id: 'loreal-revitalift-serum',
      name: 'L\'Oréal Revitalift Anti-Aging Serum',
      brand: 'L\'Oréal',
      price: 24.99,
      rating: 4.5,
      description: 'Advanced anti-aging serum with Pro-Retinol and Centella Asiatica',
      ingredients: ['Pro-Retinol', 'Centella Asiatica', 'Hyaluronic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Serum',
      targetAreas: ['wrinkles_fine_lines', 'surface_spots']
    },
    {
      id: 'loreal-hydragenist-moisturizer',
      name: 'L\'Oréal Hydragenist Daily Moisturizer',
      brand: 'L\'Oréal',
      price: 19.99,
      rating: 4.3,
      description: 'Lightweight daily moisturizer for hydrated, smooth skin',
      ingredients: ['Hyaluronic Acid', 'Glycerin', 'Ceramides'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Moisturizer',
      targetAreas: ['enlarged_pores', 'texture']
    },
    {
      id: 'loreal-brightening-cream',
      name: 'L\'Oréal Bright Reveal Brightening Cream',
      brand: 'L\'Oréal',
      price: 22.99,
      rating: 4.4,
      description: 'Brightening cream with Vitamin C and Niacinamide',
      ingredients: ['Vitamin C', 'Niacinamide', 'Glycolic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Brightening',
      targetAreas: ['surface_spots', 'uv_damage', 'dark_circles']
    },
    {
      id: 'loreal-texture-refining-toner',
      name: 'L\'Oréal Texture Refining Toner',
      brand: 'L\'Oréal',
      price: 16.99,
      rating: 4.2,
      description: 'Exfoliating toner with AHA/BHA for smooth skin texture',
      ingredients: ['Salicylic Acid', 'Glycolic Acid', 'Niacinamide'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Toner',
      targetAreas: ['texture', 'clogged_pores', 'enlarged_pores']
    },
    {
      id: 'loreal-pore-minimizing-serum',
      name: 'L\'Oréal Pore Minimizing Serum',
      brand: 'L\'Oréal',
      price: 21.99,
      rating: 4.3,
      description: 'Targeted serum for clogged pores and blackheads',
      ingredients: ['Niacinamide', 'Zinc PCA', 'Salicylic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Pore+Serum',
      targetAreas: ['clogged_pores', 'enlarged_pores', 'texture']
    },
    {
      id: 'loreal-dark-spot-corrector',
      name: 'L\'Oréal Dark Spot Corrector',
      brand: 'L\'Oréal',
      price: 18.99,
      rating: 4.5,
      description: 'Intensive treatment for emerging dark spots',
      ingredients: ['Kojic Acid', 'Vitamin C', 'Alpha Arbutin'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Dark+Spot',
      targetAreas: ['emerging_dark_spots', 'surface_spots', 'uv_damage']
    }
  ]
};

const MOCK_AI_RECOMMENDATIONS = {
  success: true,
  data: {
    recommendations: {
      wrinkles_fine_lines: {
        severity: 'moderate',
        priority: 'high',
        primaryIngredients: ['Retinol', 'Peptides', 'Hyaluronic_Acid'],
        routine: ['Gentle_cleanser', 'Retinol_serum_evening', 'Moisturizer_with_peptides', 'SPF_30_daily'],
        tips: ['Use retinol gradually', 'Always apply SPF', 'Moisturize consistently'],
        timeframe: '8-12 weeks for visible improvement'
      },
      surface_spots: {
        severity: 'mild',
        priority: 'medium',
        primaryIngredients: ['Vitamin_C', 'Niacinamide', 'Alpha_Arbutin'],
        routine: ['Vitamin_C_serum_morning', 'Niacinamide_evening', 'Exfoliate_twice_weekly'],
        tips: ['Consistent use is key', 'Protect from sun exposure', 'Be patient with results'],
        timeframe: '6-8 weeks for visible improvement'
      },
      red_areas: {
        severity: 'mild',
        priority: 'medium',
        primaryIngredients: ['Centella_Asiatica', 'Niacinamide', 'Ceramides'],
        routine: ['Gentle_cleanser', 'Soothing_toner', 'Barrier_repair_moisturizer'],
        tips: ['Avoid harsh ingredients', 'Use gentle products', 'Patch test new products'],
        timeframe: '4-6 weeks for improvement'
      },
      enlarged_pores: {
        severity: 'moderate',
        priority: 'medium',
        primaryIngredients: ['Niacinamide', 'Salicylic_Acid', 'Retinol'],
        routine: ['BHA_cleanser', 'Niacinamide_serum', 'Oil_free_moisturizer'],
        tips: ['Regular exfoliation helps', 'Keep skin hydrated', 'Avoid over-cleansing'],
        timeframe: '6-10 weeks for visible improvement'
      },
      uv_damage: {
        severity: 'moderate',
        priority: 'high',
        primaryIngredients: ['Vitamin_C', 'Tretinoin', 'Alpha_Arbutin'],
        routine: ['Antioxidant_serum_morning', 'Retinoid_evening', 'SPF_50_daily'],
        tips: ['Prevention is crucial', 'Daily SPF is non-negotiable', 'Night repair products'],
        timeframe: '8-12 weeks for improvement'
      },
      texture: {
        severity: 'moderate',
        priority: 'medium',
        primaryIngredients: ['AHA', 'BHA', 'Peptides'],
        routine: ['Exfoliating_toner', 'Texture_refining_serum', 'Hydrating_moisturizer'],
        tips: ['Gentle exfoliation works best', 'Hydration is key', 'Be consistent'],
        timeframe: '4-8 weeks for smoother texture'
      },
      clogged_pores: {
        severity: 'mild',
        priority: 'medium',
        primaryIngredients: ['Salicylic_Acid', 'Niacinamide', 'Zinc'],
        routine: ['BHA_cleanser', 'Pore_clearing_serum', 'Non_comedogenic_moisturizer'],
        tips: ['Regular deep cleansing', 'Avoid pore-clogging ingredients', 'Weekly clay masks'],
        timeframe: '4-6 weeks for clearer pores'
      },
      emerging_dark_spots: {
        severity: 'mild',
        priority: 'high',
        primaryIngredients: ['Kojic_Acid', 'Vitamin_C', 'Alpha_Arbutin'],
        routine: ['Brightening_cleanser', 'Dark_spot_serum', 'SPF_protection'],
        tips: ['Early intervention is best', 'Consistent use required', 'Protect from further damage'],
        timeframe: '6-8 weeks for fading'
      }
    },
    consolidatedRoutine: {
      morning: [
        'Gentle cleanser',
        'Vitamin C serum',
        'Lightweight moisturizer',
        'SPF 30+ sunscreen'
      ],
      evening: [
        'Double cleanse',
        'Retinol serum (3x/week)',
        'Niacinamide serum (alternate nights)',
        'Rich night moisturizer'
      ]
    },
    insights: [
      {
        type: 'positive',
        title: 'Good Progress',
        message: 'Your skin shows improvement in surface spots and dark circles.',
        icon: '✨'
      },
      {
        type: 'tip',
        title: 'Consistency is Key',
        message: 'Maintain your current routine for best results.',
        icon: '💡'
      },
      {
        type: 'actionable',
        title: 'Focus Area',
        message: 'Consider targeting enlarged pores with specific treatments.',
        icon: '🎯'
      }
    ],
    confidence: 0.87,
    generatedAt: new Date().toISOString()
  }
};

const FALLBACK_USER_REWARDS = {
  success: true,
  data: {
    points: 1250,
    level: 'Gold',
    availableRewards: [
      {
        id: 'sample-pack-1',
        name: 'L\'Oréal Sample Discovery Pack',
        pointsCost: 500,
        description: 'Try 5 deluxe samples from our premium skincare line'
      },
      {
        id: 'consultation-15',
        name: '15% Off Next Purchase',
        pointsCost: 750,
        description: 'Get 15% off your next L\'Oréal skincare purchase'
      },
      {
        id: 'virtual-consultation',
        name: 'Virtual Skincare Consultation',
        pointsCost: 1000,
        description: '30-minute one-on-one consultation with a skincare expert'
      }
    ],
    redeemedRewards: [
      {
        id: 'sample-pack-basic',
        name: 'Basic Sample Pack',
        redeemedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
};

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

// Response interceptor with fallback handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.warn('API Error - falling back to mock data:', error.message);
    
    // Return fallback data based on the endpoint
    const url = error.config?.url || '';
    
    if (url.includes('/skin-stats')) {
      return Promise.resolve(FALLBACK_SKIN_DATA);
    } else if (url.includes('/recommendations')) {
      return Promise.resolve(FALLBACK_PRODUCTS);
    } else if (url.includes('/ai/recommendations')) {
      return Promise.resolve(MOCK_AI_RECOMMENDATIONS);
    } else if (url.includes('/rewards')) {
      return Promise.resolve(FALLBACK_USER_REWARDS);
    }
    
    // For unknown endpoints, return generic success
    return Promise.resolve({ success: true, data: {} });
  }
);

// User APIs with comprehensive fallbacks
export const getUserSkinStats = async (userId) => {
  try {
    // In production/deployment, always use fallback data
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_SKIN_DATA;
    }
    
    const data = await api.get(`/users/${userId}/skin-stats`);
    return data;
  } catch (error) {
    console.log('Using fallback skin data due to API error');
    return FALLBACK_SKIN_DATA;
  }
};

export const updateUserSkinStats = async (userId, skinStats) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      // Simulate update success
      return { success: true, data: { ...FALLBACK_SKIN_DATA.data, ...skinStats } };
    }
    
    const data = await api.post(`/users/${userId}/skin-stats`, skinStats);
    return data;
  } catch (error) {
    return { success: true, data: { ...FALLBACK_SKIN_DATA.data, ...skinStats } };
  }
};

export const getUserProfile = async (userId) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: {
          id: userId,
          name: 'Demo User',
          email: 'demo@loreal.com',
          joinedDate: '2024-01-15',
          skinType: 'combination',
          concerns: ['aging', 'dark_spots']
        }
      };
    }
    
    const data = await api.get(`/users/${userId}`);
    return data;
  } catch (error) {
    return {
      success: true,
      data: {
        id: userId,
        name: 'Demo User',
        email: 'demo@loreal.com',
        joinedDate: '2024-01-15',
        skinType: 'combination',
        concerns: ['aging', 'dark_spots']
      }
    };
  }
};

// Rewards APIs with fallbacks
export const getUserRewards = async (userId) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_USER_REWARDS;
    }
    
    const data = await api.get(`/users/${userId}/rewards`);
    return data;
  } catch (error) {
    return FALLBACK_USER_REWARDS;
  }
};

export const redeemReward = async (userId, rewardId) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: {
          message: 'Reward redeemed successfully!',
          newPoints: FALLBACK_USER_REWARDS.data.points - 500
        }
      };
    }
    
    const data = await api.post(`/users/${userId}/rewards/${rewardId}/redeem`);
    return data;
  } catch (error) {
    return {
      success: true,
      data: {
        message: 'Reward redeemed successfully!',
        newPoints: FALLBACK_USER_REWARDS.data.points - 500
      }
    };
  }
};

// Products APIs with fallbacks
export const getProductRecommendations = async (areaId, userId = null) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return FALLBACK_PRODUCTS;
    }
    
    const params = userId ? { userId } : {};
    const data = await api.get(`/products/recommendations/${areaId}`, { params });
    return data;
  } catch (error) {
    return FALLBACK_PRODUCTS;
  }
};

export const getProduct = async (productId) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: FALLBACK_PRODUCTS.products.find(p => p.id === productId) || FALLBACK_PRODUCTS.products[0]
      };
    }
    
    const data = await api.get(`/products/${productId}`);
    return data;
  } catch (error) {
    return {
      success: true,
      data: FALLBACK_PRODUCTS.products.find(p => p.id === productId) || FALLBACK_PRODUCTS.products[0]
    };
  }
};

// Analysis APIs with fallbacks
export const startSkinAnalysis = async (userId, analysisData) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: {
          analysisId: 'analysis_' + Date.now(),
          status: 'completed',
          results: FALLBACK_SKIN_DATA.data
        }
      };
    }
    
    const data = await api.post(`/analysis/start`, { userId, ...analysisData });
    return data;
  } catch (error) {
    return {
      success: true,
      data: {
        analysisId: 'analysis_' + Date.now(),
        status: 'completed',
        results: FALLBACK_SKIN_DATA.data
      }
    };
  }
};

export const getAnalysisStatus = async (analysisId) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: {
          analysisId,
          status: 'completed',
          progress: 100,
          results: FALLBACK_SKIN_DATA.data
        }
      };
    }
    
    const data = await api.get(`/analysis/${analysisId}/status`);
    return data;
  } catch (error) {
    return {
      success: true,
      data: {
        analysisId,
        status: 'completed',
        progress: 100,
        results: FALLBACK_SKIN_DATA.data
      }
    };
  }
};

// AI APIs with fallbacks
export const getAIRecommendations = async (skinData, userProfile = {}) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return MOCK_AI_RECOMMENDATIONS;
    }
    
    const data = await api.post('/ai/recommendations', { 
      skinData, 
      userProfile 
    });
    return data;
  } catch (error) {
    return MOCK_AI_RECOMMENDATIONS;
  }
};

export const generateSmartGoals = async (currentScores, userGoals = {}) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: {
          goals: Object.keys(currentScores).reduce((acc, area) => {
            acc[area] = {
              current: currentScores[area],
              target: Math.max(currentScores[area] - 15, 10),
              timeframe: '8-12 weeks',
              priority: currentScores[area] > 40 ? 'high' : 'medium'
            };
            return acc;
          }, {}),
          motivationalMessage: 'Your skin journey is unique. These goals are tailored to your current skin profile.',
          tips: ['Consistency is key', 'Results take time', 'Track your progress weekly']
        }
      };
    }
    
    const data = await api.post('/ai/goals', { 
      currentScores, 
      userGoals 
    });
    return data;
  } catch (error) {
    return {
      success: true,
      data: {
        goals: Object.keys(currentScores).reduce((acc, area) => {
          acc[area] = {
            current: currentScores[area],
            target: Math.max(currentScores[area] - 15, 10),
            timeframe: '8-12 weeks',
            priority: currentScores[area] > 40 ? 'high' : 'medium'
          };
          return acc;
        }, {}),
        motivationalMessage: 'Your skin journey is unique. These goals are tailored to your current skin profile.',
        tips: ['Consistency is key', 'Results take time', 'Track your progress weekly']
      }
    };
  }
};

export const getAIEnhancedSkinStats = async (userId) => {
  try {
    if (process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost')) {
      return {
        success: true,
        data: {
          ...FALLBACK_SKIN_DATA.data,
          aiRecommendations: MOCK_AI_RECOMMENDATIONS.data,
          aiEnhanced: true
        }
      };
    }
    
    const data = await api.get(`/users/${userId}/skin-stats-ai`);
    return data;
  } catch (error) {
    return {
      success: true,
      data: {
        ...FALLBACK_SKIN_DATA.data,
        aiRecommendations: MOCK_AI_RECOMMENDATIONS.data,
        aiEnhanced: true
      }
    };
  }
};

// Export the axios instance for custom requests
export default api;
