// Enhanced Mock Data for L'Oréal iBeauty Demo Presentation
// This file demonstrates the full capabilities of the AI-powered skin analysis platform
// with realistic user scenarios, temporal progression, and complex analysis patterns

// ============================================================================
// USER PROFILES - Multiple personas showcasing different skin journeys
// ============================================================================

export const USER_PROFILES = {
  // Original demo user for consistency
  'user123': {
    userId: 'user123',
    name: 'Demo User',
    age: 30,
    skinType: 'combination',
    primaryConcerns: ['enlarged_pores', 'surface_spots', 'dark_circles'],
    membershipLevel: 'Premium',
    currentPoints: 1250,
    joinDate: '2024-06-01',
    goals: {}
  },
  // Profile 1: Excellent skin health progress
  'user1': {
    userId: 'user1',
    name: 'User 1',
    age: 28,
    skinType: 'combination',
    primaryConcerns: ['enlarged_pores', 'clogged_pores', 'emerging_dark_spots'],
    membershipLevel: 'Silver',
    currentPoints: 850,
    joinDate: '2024-09-15',
    goals: {}
  },
  // Profile 2: Poor skin health - needs improvement
  'user2': {
    userId: 'user2',
    name: 'User 2',
    age: 45,
    skinType: 'dry',
    primaryConcerns: ['wrinkles_fine_lines', 'nasolabial_folds', 'uv_damage', 'surface_spots'],
    membershipLevel: 'Gold',
    currentPoints: 2150,
    joinDate: '2024-03-10',
    goals: {}
  },
  // Profile 3: Moderate skin health - making progress
  'user3': {
    userId: 'user3',
    name: 'User 3',
    age: 32,
    skinType: 'sensitive',
    primaryConcerns: ['red_areas', 'texture', 'dark_circles'],
    membershipLevel: 'Bronze',
    currentPoints: 420,
    joinDate: '2024-11-20',
    goals: {}
  }
};

// ============================================================================
// TEMPORAL SKIN DATA - 6 months of progression data per user
// ============================================================================

export const TEMPORAL_SKIN_DATA = {
  user123: {
    // Original demo user data - balanced across all areas
    '2024-12-01': {
      success: true,
      data: {
        userId: 'user123',
        lastUpdated: '2024-12-01T09:00:00Z',
        analysisNumber: 12,
        areas: {
          wrinkles_fine_lines: {
            currentScore: 30,
            previousScore: 38,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          surface_spots: {
            currentScore: 25,
            previousScore: 32,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          red_areas: {
            currentScore: 18,
            previousScore: 24,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          enlarged_pores: {
            currentScore: 40,
            previousScore: 48,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          uv_damage: {
            currentScore: 28,
            previousScore: 35,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          dark_circles: {
            currentScore: 35,
            previousScore: 42,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          under_eye_bags: {
            currentScore: 22,
            previousScore: 28,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          nasolabial_folds: {
            currentScore: 32,
            previousScore: 38,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          texture: {
            currentScore: 26,
            previousScore: 34,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          clogged_pores: {
            currentScore: 20,
            previousScore: 30,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          },
          emerging_dark_spots: {
            currentScore: 15,
            previousScore: 22,
            trend: 'improving',
            lastAnalyzed: '2024-12-01T09:00:00Z'
          }
        }
      }
    }
  },
  user1: {
    // User 1 - EXCELLENT skin health (low scores = better skin)
    '2024-11-15': {
      success: true,
      data: {
        userId: 'user1',
        lastUpdated: '2024-11-15T10:30:00Z',
        analysisNumber: 24,
        areas: {
          wrinkles_fine_lines: {
            currentScore: 8,
            previousScore: 15,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          surface_spots: {
            currentScore: 5,
            previousScore: 12,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          red_areas: {
            currentScore: 3,
            previousScore: 8,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          enlarged_pores: {
            currentScore: 12,
            previousScore: 25,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          uv_damage: {
            currentScore: 7,
            previousScore: 18,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          dark_circles: {
            currentScore: 10,
            previousScore: 20,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          under_eye_bags: {
            currentScore: 6,
            previousScore: 15,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          nasolabial_folds: {
            currentScore: 9,
            previousScore: 18,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          texture: {
            currentScore: 4,
            previousScore: 16,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          clogged_pores: {
            currentScore: 2,
            previousScore: 14,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          },
          emerging_dark_spots: {
            currentScore: 3,
            previousScore: 10,
            trend: 'significantly_improved',
            lastAnalyzed: '2024-11-15T10:30:00Z'
          }
        }
      }
    }
  },
  
  user2: {
    // User 2 - POOR skin health (high scores = problem areas)
    '2024-10-22': {
      success: true,
      data: {
        userId: 'user2',
        lastUpdated: '2024-10-22T14:20:00Z',
        analysisNumber: 8,
        areas: {
          wrinkles_fine_lines: {
            currentScore: 75,
            previousScore: 72,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          surface_spots: {
            currentScore: 68,
            previousScore: 65,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          red_areas: {
            currentScore: 55,
            previousScore: 52,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          enlarged_pores: {
            currentScore: 72,
            previousScore: 70,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          uv_damage: {
            currentScore: 80,
            previousScore: 78,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          dark_circles: {
            currentScore: 65,
            previousScore: 62,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          under_eye_bags: {
            currentScore: 58,
            previousScore: 55,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          nasolabial_folds: {
            currentScore: 78,
            previousScore: 75,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          texture: {
            currentScore: 70,
            previousScore: 68,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          clogged_pores: {
            currentScore: 62,
            previousScore: 60,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          },
          emerging_dark_spots: {
            currentScore: 74,
            previousScore: 71,
            trend: 'worsening',
            lastAnalyzed: '2024-10-22T14:20:00Z'
          }
        }
      }
    }
  },
  
  user3: {
    // User 3 - MODERATE skin health (medium scores, some improvement)
    '2024-11-28': {
      success: true,
      data: {
        userId: 'user3',
        lastUpdated: '2024-11-28T16:45:00Z',
        analysisNumber: 15,
        areas: {
          wrinkles_fine_lines: {
            currentScore: 42,
            previousScore: 48,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          surface_spots: {
            currentScore: 38,
            previousScore: 42,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          red_areas: {
            currentScore: 35,
            previousScore: 45,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          enlarged_pores: {
            currentScore: 45,
            previousScore: 48,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          uv_damage: {
            currentScore: 40,
            previousScore: 45,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          dark_circles: {
            currentScore: 38,
            previousScore: 42,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          under_eye_bags: {
            currentScore: 32,
            previousScore: 36,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          nasolabial_folds: {
            currentScore: 44,
            previousScore: 48,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          texture: {
            currentScore: 36,
            previousScore: 42,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          clogged_pores: {
            currentScore: 33,
            previousScore: 38,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          },
          emerging_dark_spots: {
            currentScore: 30,
            previousScore: 35,
            trend: 'improving',
            lastAnalyzed: '2024-11-28T16:45:00Z'
          }
        }
      }
    }
  }
};

// ============================================================================
// SEASONAL ADAPTATIONS - Environmental factors affecting skin analysis
// ============================================================================

export const SEASONAL_ADAPTATIONS = {
  winter: {
    environmentalFactors: ['low_humidity', 'indoor_heating', 'cold_wind'],
    commonConcerns: ['dryness', 'red_areas', 'texture'],
    recommendedAdjustments: {
      increased_hydration: true,
      barrier_repair_focus: true,
      gentler_exfoliation: true,
      spf_adjustment: 'maintain_protection'
    }
  },
  
  summer: {
    environmentalFactors: ['high_uv', 'humidity', 'heat', 'sweating'],
    commonConcerns: ['uv_damage', 'clogged_pores', 'surface_spots'],
    recommendedAdjustments: {
      enhanced_sun_protection: true,
      antioxidant_boost: true,
      oil_control: true,
      spf_adjustment: 'increase_protection'
    }
  },
  
  spring: {
    environmentalFactors: ['allergens', 'changing_humidity', 'increased_sun'],
    commonConcerns: ['red_areas', 'sensitivity', 'emerging_dark_spots'],
    recommendedAdjustments: {
      allergy_considerations: true,
      gentle_introduction: true,
      gradual_routine_changes: true
    }
  },
  
  fall: {
    environmentalFactors: ['decreasing_humidity', 'temperature_changes'],
    commonConcerns: ['texture', 'preparation_for_winter'],
    recommendedAdjustments: {
      barrier_strengthening: true,
      preparation_phase: true,
      intensive_treatments: true
    }
  }
};

// ============================================================================
// ADVANCED AI ANALYSIS - Complex recommendation scenarios
// ============================================================================

export const ADVANCED_AI_SCENARIOS = {
  // Scenario 1: Rapid improvement user
  rapid_improvement: {
    userId: 'user1',
    analysisType: 'rapid_progress',
    insights: {
      adherence_score: 95,
      product_effectiveness: 'high',
      routine_optimization: 'excellent',
      lifestyle_factors: 'positive',
      genetic_predisposition: 'favorable'
    },
    recommendations: {
      continue_current_routine: true,
      add_maintenance_phase: true,
      introduce_prevention_focus: true,
      consider_advanced_treatments: false
    }
  },
  
  // Scenario 2: Plateau breaking
  plateau_breaking: {
    userId: 'user2',
    analysisType: 'plateau_optimization',
    insights: {
      adherence_score: 88,
      product_effectiveness: 'moderate',
      routine_optimization: 'needs_adjustment',
      skin_adaptation: 'detected',
      hormone_considerations: 'perimenopause_factors'
    },
    recommendations: {
      routine_refresh: true,
      active_ingredient_rotation: true,
      professional_treatment_consideration: true,
      lifestyle_modification_focus: true
    }
  },
  
  // Scenario 3: Sensitive skin progression
  sensitive_skin_management: {
    userId: 'user3',
    analysisType: 'sensitive_skin_optimization',
    insights: {
      skin_barrier_status: 'improving',
      tolerance_building: 'gradual_success',
      inflammation_markers: 'decreasing',
      environmental_sensitivity: 'high'
    },
    recommendations: {
      continue_gentle_approach: true,
      gradual_active_introduction: true,
      environmental_protection_focus: true,
      stress_management_emphasis: true
    }
  }
};

// ============================================================================
// PERSONALIZED PRODUCT ECOSYSTEMS - Curated based on user journey stage
// ============================================================================

export const PERSONALIZED_PRODUCT_SETS = {
  // Beginner set for emerging concerns
  starter_set: {
    name: 'L\'Oréal Skin Essentials Starter Kit',
    targetUser: 'emerging_concerns',
    products: [
      {
        id: 'gentle-cleanser-starter',
        name: 'L\'Oréal Gentle Daily Cleanser',
        purpose: 'foundation_cleansing',
        timeOfDay: 'morning_evening',
        priority: 1
      },
      {
        id: 'niacinamide-serum-starter',
        name: 'L\'Oréal Pure Niacinamide Serum',
        purpose: 'pore_refinement',
        timeOfDay: 'morning',
        priority: 2
      },
      {
        id: 'moisturizer-starter',
        name: 'L\'Oréal Hydra Genius Daily Moisturizer',
        purpose: 'hydration_barrier',
        timeOfDay: 'morning_evening',
        priority: 1
      },
      {
        id: 'sunscreen-starter',
        name: 'L\'Oréal Anthelios SPF 50+ Fluid',
        purpose: 'protection',
        timeOfDay: 'morning',
        priority: 1
      }
    ],
    expectedResults: '4-6 weeks for visible pore refinement',
    graduationCriteria: 'consistent_use_tolerance_built'
  },
  
  // Advanced anti-aging system
  advanced_antiaging: {
    name: 'L\'Oréal Age Perfect Pro System',
    targetUser: 'mature_skin_concerns',
    products: [
      {
        id: 'retinol-advanced',
        name: 'L\'Oréal Revitalift Night Serum Pro-Retinol',
        purpose: 'cellular_renewal',
        timeOfDay: 'evening',
        priority: 1,
        usage_frequency: 'every_other_night_building_to_nightly'
      },
      {
        id: 'vitamin-c-advanced',
        name: 'L\'Oréal Bright Reveal Vitamin C Serum',
        purpose: 'antioxidant_protection',
        timeOfDay: 'morning',
        priority: 1
      },
      {
        id: 'peptide-cream',
        name: 'L\'Oréal Age Perfect Peptide Cream',
        purpose: 'firmness_hydration',
        timeOfDay: 'morning_evening',
        priority: 2
      },
      {
        id: 'eye-complex',
        name: 'L\'Oréal Age Perfect Eye Complex',
        purpose: 'eye_area_treatment',
        timeOfDay: 'morning_evening',
        priority: 2
      }
    ],
    expectedResults: '8-12 weeks for significant improvement',
    maintenancePhase: 'ongoing_with_seasonal_adjustments'
  },
  
  // Sensitive skin gentle system
  sensitive_care: {
    name: 'L\'Oréal Sensitive Skin Care System',
    targetUser: 'sensitive_reactive_skin',
    products: [
      {
        id: 'micellar-water-sensitive',
        name: 'L\'Oréal Micellar Water Sensitive',
        purpose: 'gentle_cleansing',
        timeOfDay: 'evening',
        priority: 1
      },
      {
        id: 'centella-serum',
        name: 'L\'Oréal Centella Asiatica Calming Serum',
        purpose: 'inflammation_reduction',
        timeOfDay: 'morning_evening',
        priority: 1
      },
      {
        id: 'barrier-cream',
        name: 'L\'Oréal Sensitive Skin Barrier Cream',
        purpose: 'barrier_restoration',
        timeOfDay: 'morning_evening',
        priority: 1
      },
      {
        id: 'mineral-sunscreen',
        name: 'L\'Oréal Anthelios Mineral Sensitive SPF 50+',
        purpose: 'gentle_protection',
        timeOfDay: 'morning',
        priority: 1
      }
    ],
    expectedResults: '2-4 weeks for reduced sensitivity',
    progressionPlan: 'gradual_active_introduction_after_barrier_repair'
  }
};

// ============================================================================
// LIFESTYLE INTEGRATION DATA - Holistic skin health factors
// ============================================================================

export const LIFESTYLE_FACTORS = {
  sleep_impact: {
    optimal_hours: '7-9',
    quality_indicators: ['deep_sleep_percentage', 'sleep_consistency', 'screen_time_before_bed'],
    skin_correlation: {
      insufficient_sleep: ['dark_circles', 'dull_texture', 'increased_sensitivity'],
      optimal_sleep: ['improved_barrier_function', 'enhanced_repair', 'reduced_inflammation']
    }
  },
  
  stress_management: {
    stress_indicators: ['cortisol_levels', 'lifestyle_stressors', 'relaxation_practices'],
    skin_correlation: {
      high_stress: ['increased_breakouts', 'delayed_healing', 'sensitivity_flares'],
      managed_stress: ['stable_skin', 'consistent_progress', 'better_product_tolerance']
    }
  },
  
  environmental_factors: {
    pollution_exposure: ['urban_environment', 'air_quality_index', 'daily_commute'],
    climate_adaptation: ['humidity_levels', 'temperature_variations', 'seasonal_changes'],
    protection_recommendations: 'dynamic_based_on_exposure_levels'
  },
  
  nutrition_hydration: {
    hydration_tracking: 'optimal_8_glasses_daily',
    antioxidant_intake: ['vitamin_c_foods', 'vitamin_e_sources', 'omega_3_rich_foods'],
    skin_supporting_nutrients: ['collagen_boosting', 'anti_inflammatory', 'barrier_supporting']
  }
};

// ============================================================================
// PRESENTATION DEMO SCENARIOS - Specific use cases for live demonstration
// ============================================================================

export const DEMO_SCENARIOS = {
  // Scenario 1: Real-time analysis comparison
  before_after_transformation: {
    title: 'User 1\'s Excellent Progress Journey',
    userProfile: 'user1',
    timeframe: '6_months',
    keyMetrics: {
      overall_improvement: '85%',
      most_improved_area: 'clogged_pores (-86%)',
      goal_achievement: '4_out_of_4_goals_exceeded',
      member_progression: 'Bronze → Silver'
    },
    highlightFeatures: [
      'temporal_progress_tracking',
      'goal_achievement_visualization',
      'personalized_routine_optimization',
      'rewards_integration'
    ]
  },
  
  // Scenario 2: Advanced AI recommendations
  ai_powered_insights: {
    title: 'User 2\'s Improvement Plan Analysis',
    userProfile: 'user2',
    analysisType: 'advanced_optimization',
    aiInsights: {
      pattern_recognition: 'routine_inconsistency_detected',
      optimization_suggestions: 'comprehensive_routine_needed',
      predictive_modeling: 'significant_improvement_possible',
      personalization_depth: 'lifestyle_factors_considered'
    },
    highlightFeatures: [
      'problem_area_detection',
      'intensive_recommendation_engine',
      'multi_factor_analysis',
      'professional_treatment_guidance'
    ]
  },
  
  // Scenario 3: Sensitive skin success story
  sensitive_skin_journey: {
    title: 'User 3\'s Steady Progress Success',
    userProfile: 'user3',
    challengeType: 'moderate_skin_improvement',
    successMetrics: {
      tolerance_building: '70%_improvement',
      inflammation_reduction: '25%_decrease',
      routine_adherence: '85%_consistency',
      confidence_boost: 'noticeable_quality_of_life_improvement'
    },
    highlightFeatures: [
      'moderate_improvement_tracking',
      'consistent_progress_building',
      'inflammation_monitoring',
      'barrier_function_restoration'
    ]
  }
};

// Export default for easy importing
const enhancedMockData = {
  USER_PROFILES,
  TEMPORAL_SKIN_DATA,
  SEASONAL_ADAPTATIONS,
  ADVANCED_AI_SCENARIOS,
  PERSONALIZED_PRODUCT_SETS,
  LIFESTYLE_FACTORS,
  DEMO_SCENARIOS
};

export default enhancedMockData;
