export const SKIN_AREAS = [
  {
    id: 'wrinkles_fine_lines',
    name: 'Wrinkles & Fine Lines',
    shortName: 'Wrinkles',
    icon: '✨',
    color: '#FF6B6B',
    description: 'Lines and wrinkles around eyes, mouth, and forehead',
    category: 'aging',
    measurementUnit: 'severity',
    optimalRange: { min: 0, max: 20 }
  },
  {
    id: 'surface_spots',
    name: 'Surface Spots',
    shortName: 'Spots',
    icon: '🌟',
    color: '#4ECDC4',
    description: 'Age spots, sun spots, and surface pigmentation',
    category: 'pigmentation',
    measurementUnit: 'coverage',
    optimalRange: { min: 0, max: 15 }
  },
  {
    id: 'red_areas',
    name: 'Red Areas',
    shortName: 'Redness',
    icon: '🌹',
    color: '#FF8E53',
    description: 'Redness, inflammation, and irritated areas',
    category: 'inflammation',
    measurementUnit: 'intensity',
    optimalRange: { min: 0, max: 10 }
  },
  {
    id: 'enlarged_pores',
    name: 'Enlarged Pores',
    shortName: 'Pores',
    icon: '🔍',
    color: '#95E1D3',
    description: 'Visible pores and skin texture irregularities',
    category: 'texture',
    measurementUnit: 'visibility',
    optimalRange: { min: 0, max: 25 }
  },
  {
    id: 'uv_damage',
    name: 'UV Damage',
    shortName: 'UV Damage',
    icon: '☀️',
    color: '#F38BA8',
    description: 'Sun damage and photo-aging effects',
    category: 'damage',
    measurementUnit: 'severity',
    optimalRange: { min: 0, max: 20 }
  },
  {
    id: 'texture',
    name: 'Texture',
    shortName: 'Texture',
    icon: '🌊',
    color: '#A8DADC',
    description: 'Skin smoothness and surface texture quality',
    category: 'texture',
    measurementUnit: 'roughness',
    optimalRange: { min: 0, max: 30 }
  },
  {
    id: 'clogged_pores',
    name: 'Clogged Pores',
    shortName: 'Clogged',
    icon: '🎯',
    color: '#FFB3BA',
    description: 'Blackheads, whiteheads, and congested pores',
    category: 'congestion',
    measurementUnit: 'density',
    optimalRange: { min: 0, max: 15 }
  },
  {
    id: 'emerging_dark_spots',
    name: 'Emerging Dark Spots',
    shortName: 'Dark Spots',
    icon: '🌑',
    color: '#DDA0DD',
    description: 'Early-stage dark spots and hyperpigmentation',
    category: 'pigmentation',
    measurementUnit: 'intensity',
    optimalRange: { min: 0, max: 12 }
  }
];

export const getAreaById = (id) => {
  return SKIN_AREAS.find(area => area.id === id);
};

export const calculateProgress = (current, goal, baseline = 100) => {
  // For skin metrics, lower scores are typically better
  // Progress is measured as improvement from baseline toward goal
  if (baseline === goal) return 100;
  
  const totalImprovement = Math.abs(baseline - goal);
  const currentImprovement = Math.abs(baseline - current);
  const progress = Math.min(Math.max((currentImprovement / totalImprovement) * 100, 0), 100);
  
  return Math.round(progress);
};

export const getScoreCategory = (score, area) => {
  const optimal = area.optimalRange;
  if (score <= optimal.max) return 'excellent';
  if (score <= optimal.max * 1.5) return 'good';
  if (score <= optimal.max * 2) return 'fair';
  return 'needs-improvement';
};

export const generateAIGoal = (currentScore, area) => {
  // AI logic for setting realistic next goals
  const optimal = area.optimalRange.max;
  const improvement = Math.max(Math.floor(currentScore * 0.15), 2); // 15% improvement minimum
  const newGoal = Math.max(currentScore - improvement, optimal);
  
  return {
    goal: newGoal,
    timeframe: '2-4 weeks',
    confidence: 0.85,
    reasoning: `Based on your current ${area.name.toLowerCase()} score, a ${improvement}-point improvement is achievable with consistent care.`
  };
};
