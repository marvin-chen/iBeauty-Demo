// Demo Data Integration Helper
// This file provides easy switching between basic and enhanced demo data

import { SKIN_DATA, PRODUCTS_DATA, AI_RECOMMENDATIONS } from './mockData.js';
import enhancedMockData from './enhancedMockData.js';

// ============================================================================
// DEMO MODE CONFIGURATION
// ============================================================================

// Set to true to use enhanced presentation data
const USE_ENHANCED_DEMO_DATA = true;

// ============================================================================
// DEMO USER SELECTOR - Switch between different user scenarios
// ============================================================================

export const DEMO_USERS = {
  // Current user (existing data)
  current: 'user123',
  
  // Enhanced demo users
  excellent_progress: 'user1',
  needs_improvement: 'user2',
  moderate_progress: 'user3'
};

// ============================================================================
// DATA SWITCHING FUNCTIONS - Easy demo data management
// ============================================================================

/**
 * Get skin data for specific user and time period
 * @param {string} userId - User identifier
 * @param {string} timeframe - Optional: specific date or 'current'
 * @returns {object} Skin analysis data
 */
export function getDemoSkinData(userId = DEMO_USERS.current, timeframe = 'current') {
  // Check for persisted goals in sessionStorage
  const getPersistedGoals = (userId) => {
    try {
      const storedGoals = sessionStorage.getItem(`userGoals_${userId}`);
      return storedGoals ? JSON.parse(storedGoals) : null;
    } catch (error) {
      console.log('Error reading goals from sessionStorage:', error);
      return null;
    }
  };

  if (!USE_ENHANCED_DEMO_DATA || userId === DEMO_USERS.current) {
    // Return regular demo data
    const cleanedSkinData = { ...SKIN_DATA };
    if (cleanedSkinData.data) {
      cleanedSkinData.data = { ...cleanedSkinData.data };
      
      // Check for persisted goals first
      const persistedGoals = getPersistedGoals(userId);
      if (persistedGoals) {
        cleanedSkinData.data.goals = persistedGoals.goals;
        cleanedSkinData.data.hasGoals = true;
        cleanedSkinData.data.aiGoalsGenerated = true;
        cleanedSkinData.data.goalsGeneratedAt = persistedGoals.generatedAt;
        
        // Merge goals into area data
        if (cleanedSkinData.data.areas && persistedGoals.goals) {
          Object.keys(persistedGoals.goals).forEach(areaId => {
            if (cleanedSkinData.data.areas[areaId]) {
              cleanedSkinData.data.areas[areaId].goal = persistedGoals.goals[areaId].target;
              cleanedSkinData.data.areas[areaId].goalData = persistedGoals.goals[areaId];
            }
          });
        }
      } else {
        // No persisted goals - clear them for fresh AI generation
        delete cleanedSkinData.data.goals;
        cleanedSkinData.data.hasGoals = false;
      }
    }
    return cleanedSkinData;
  }
  
  // Return enhanced temporal data
  const userData = enhancedMockData.TEMPORAL_SKIN_DATA[userId];
  if (!userData) return SKIN_DATA;
  
  if (timeframe === 'current') {
    // Get most recent analysis
    const dates = Object.keys(userData).sort().reverse();
    const mostRecentData = userData[dates[0]];
    
    // Ensure the data structure matches what the app expects
    if (mostRecentData && mostRecentData.data) {
      const cleanedData = { ...mostRecentData };
      if (cleanedData.data) {
        cleanedData.data = { ...cleanedData.data };
        
        // Check for persisted goals first
        const persistedGoals = getPersistedGoals(userId);
        if (persistedGoals) {
          cleanedData.data.goals = persistedGoals.goals;
          cleanedData.data.hasGoals = true;
          cleanedData.data.aiGoalsGenerated = true;
          cleanedData.data.goalsGeneratedAt = persistedGoals.generatedAt;
          
          // Merge goals into area data
          if (cleanedData.data.areas && persistedGoals.goals) {
            Object.keys(persistedGoals.goals).forEach(areaId => {
              if (cleanedData.data.areas[areaId]) {
                cleanedData.data.areas[areaId].goal = persistedGoals.goals[areaId].target;
                cleanedData.data.areas[areaId].goalData = persistedGoals.goals[areaId];
              }
            });
          }
        } else {
          // No persisted goals - clear them for fresh AI generation
          delete cleanedData.data.goals;
          cleanedData.data.hasGoals = false;
        }
      }
      return cleanedData;
    }
    
    // If no proper structure, create one from the areas data
    if (mostRecentData && mostRecentData.areas) {
      return {
        success: true,
        data: {
          userId: userId,
          lastUpdated: new Date().toISOString(),
          areas: mostRecentData.areas,
          hasGoals: false // Goals not yet generated by AI
        }
      };
    }
  }
  
  const specificData = userData[timeframe];
  if (specificData && specificData.areas) {
    return {
      success: true,
      data: {
        userId: userId,
        lastUpdated: timeframe,
        areas: specificData.areas
      }
    };
  }
  
  return SKIN_DATA;
}

/**
 * Get user profile information
 * @param {string} userId - User identifier
 * @returns {object} User profile data
 */
export function getDemoUserProfile(userId = DEMO_USERS.current) {
  if (!USE_ENHANCED_DEMO_DATA || userId === DEMO_USERS.current) {
    return {
      userId: 'user123',
      name: 'Demo User',
      membershipLevel: 'Gold'
    };
  }
  
  return enhancedMockData.USER_PROFILES[userId] || null;
}

/**
 * Get temporal progression data for demo
 * @param {string} userId - User identifier
 * @returns {object} Complete journey data
 */
export function getDemoProgressionData(userId = DEMO_USERS.current) {
  if (!USE_ENHANCED_DEMO_DATA) return null;
  
  return enhancedMockData.TEMPORAL_SKIN_DATA[userId] || null;
}

/**
 * Get personalized product recommendations
 * @param {string} userId - User identifier
 * @returns {object} Product recommendation data
 */
export function getDemoProductRecommendations(userId = DEMO_USERS.current) {
  if (!USE_ENHANCED_DEMO_DATA) {
    return PRODUCTS_DATA;
  }
  
  const userProfile = getDemoUserProfile(userId);
  if (!userProfile) return PRODUCTS_DATA;
  
  // Get appropriate product set based on user profile
  const { primaryConcerns, age } = userProfile;
  
  if (age < 30) {
    return {
      ...PRODUCTS_DATA,
      recommendedSet: enhancedMockData.PERSONALIZED_PRODUCT_SETS.starter_set
    };
  } else if (age > 40) {
    return {
      ...PRODUCTS_DATA,
      recommendedSet: enhancedMockData.PERSONALIZED_PRODUCT_SETS.advanced_antiaging
    };
  } else if (primaryConcerns?.includes('red_areas')) {
    return {
      ...PRODUCTS_DATA,
      recommendedSet: enhancedMockData.PERSONALIZED_PRODUCT_SETS.sensitive_care
    };
  }
  
  return PRODUCTS_DATA;
}

/**
 * Get AI analysis scenario data
 * @param {string} userId - User identifier
 * @returns {object} AI insights and recommendations
 */
export function getDemoAIAnalysis(userId = DEMO_USERS.current) {
  if (!USE_ENHANCED_DEMO_DATA) {
    return AI_RECOMMENDATIONS;
  }
  
  // Return scenario-specific AI analysis
  const scenarios = enhancedMockData.ADVANCED_AI_SCENARIOS;
  
  if (userId === DEMO_USERS.young_professional) {
    return {
      ...AI_RECOMMENDATIONS,
      scenario: scenarios.rapid_improvement
    };
  } else if (userId === DEMO_USERS.mature_antiaging) {
    return {
      ...AI_RECOMMENDATIONS,
      scenario: scenarios.plateau_breaking
    };
  } else if (userId === DEMO_USERS.sensitive_skin) {
    return {
      ...AI_RECOMMENDATIONS,
      scenario: scenarios.sensitive_skin_management
    };
  }
  
  return AI_RECOMMENDATIONS;
}

/**
 * Get seasonal adaptation recommendations
 * @param {string} season - Current season
 * @returns {object} Seasonal adjustments
 */
export function getSeasonalAdaptations(season = 'winter') {
  if (!USE_ENHANCED_DEMO_DATA) return null;
  
  return enhancedMockData.SEASONAL_ADAPTATIONS[season] || null;
}

// ============================================================================
// PRESENTATION HELPER FUNCTIONS
// ============================================================================

/**
 * Enable enhanced demo mode for presentations
 */
export function enableDemoMode() {
  // In a real implementation, this would update the configuration
  console.log('🎪 Enhanced demo mode activated!');
  console.log('Available demo users:', Object.keys(DEMO_USERS));
  console.log('Use getDemoSkinData(userId) to switch between users');
  
  return {
    demoUsers: DEMO_USERS,
    availableScenarios: Object.keys(enhancedMockData.DEMO_SCENARIOS),
    temporalDataAvailable: Object.keys(enhancedMockData.TEMPORAL_SKIN_DATA)
  };
}

/**
 * Get specific demo scenario for presentation
 * @param {string} scenarioName - Scenario identifier
 * @returns {object} Complete scenario data
 */
export function getDemoScenario(scenarioName) {
  if (!USE_ENHANCED_DEMO_DATA) return null;
  
  const scenario = enhancedMockData.DEMO_SCENARIOS[scenarioName];
  if (!scenario) return null;
  
  const userId = scenario.userProfile;
  
  return {
    scenario,
    userData: getDemoUserProfile(userId),
    skinData: getDemoSkinData(userId),
    progressData: getDemoProgressionData(userId),
    aiAnalysis: getDemoAIAnalysis(userId)
  };
}

// ============================================================================
// QUICK DEMO SWITCHER - For live presentations
// ============================================================================

export const QUICK_DEMO_SWITCHES = {
  // Switch to young professional demo
  switchToSarah: () => getDemoScenario('before_after_transformation'),
  
  // Switch to mature skin demo
  switchToMaria: () => getDemoScenario('ai_powered_insights'),
  
  // Switch to sensitive skin demo
  switchToEmma: () => getDemoScenario('sensitive_skin_journey'),
  
  // Get all scenarios for overview
  getAllScenarios: () => Object.keys(enhancedMockData.DEMO_SCENARIOS).map(key => 
    getDemoScenario(key)
  )
};

// ============================================================================
// USAGE EXAMPLES - How to integrate during presentation
// ============================================================================

/*
// Example 1: Switch to Sarah's data during demo
const sarahData = getDemoSkinData(DEMO_USERS.young_professional);
const sarahProgress = getDemoProgressionData(DEMO_USERS.young_professional);

// Example 2: Show Maria's plateau-breaking analysis
const mariaScenario = getDemoScenario('ai_powered_insights');

// Example 3: Enable demo mode and show available options
const demoInfo = enableDemoMode();

// Example 4: Quick scenario switching during presentation
const scenario1 = QUICK_DEMO_SWITCHES.switchToSarah();
const scenario2 = QUICK_DEMO_SWITCHES.switchToMaria();
const scenario3 = QUICK_DEMO_SWITCHES.switchToEmma();

// Example 5: Show seasonal adaptations
const winterAdaptations = getSeasonalAdaptations('winter');
const summerAdaptations = getSeasonalAdaptations('summer');
*/

/**
 * Save user goals to sessionStorage for persistence during session
 * @param {string} userId - User identifier
 * @param {object} goals - Goals object to persist
 * @param {string} generatedAt - Timestamp when goals were generated
 */
export function saveUserGoals(userId, goals, generatedAt) {
  try {
    const goalsData = {
      goals,
      generatedAt,
      userId
    };
    sessionStorage.setItem(`userGoals_${userId}`, JSON.stringify(goalsData));
    console.log(`💾 Goals saved for user ${userId}`);
  } catch (error) {
    console.error('Error saving goals to sessionStorage:', error);
  }
}

/**
 * Clear user goals from sessionStorage
 * @param {string} userId - User identifier
 */
export function clearUserGoals(userId) {
  try {
    sessionStorage.removeItem(`userGoals_${userId}`);
    console.log(`🗑️ Goals cleared for user ${userId}`);
  } catch (error) {
    console.error('Error clearing goals from sessionStorage:', error);
  }
}

const demoDataHelper = {
  DEMO_USERS,
  getDemoSkinData,
  getDemoUserProfile,
  getDemoProgressionData,
  getDemoProductRecommendations,
  getDemoAIAnalysis,
  getSeasonalAdaptations,
  enableDemoMode,
  getDemoScenario,
  QUICK_DEMO_SWITCHES,
  saveUserGoals,
  clearUserGoals
};

export default demoDataHelper;
