// Centralized mock data used across all environments
// This ensures consistency between local, backend, and deployed versions

export const SKIN_DATA = {
  success: true,
  data: {
    userId: 'user123',
    lastUpdated: new Date().toISOString(),
    areas: {
      wrinkles_fine_lines: {
        currentScore: 45,
        goal: 30,
        progress: 35,
        previousScore: 52,
        lastAnalyzed: new Date().toISOString()
      },
      surface_spots: {
        currentScore: 28,
        goal: 20,
        progress: 60,
        previousScore: 35,
        lastAnalyzed: new Date().toISOString()
      },
      red_areas: {
        currentScore: 25,
        goal: 18,
        progress: 45,
        previousScore: 30,
        lastAnalyzed: new Date().toISOString()
      },
      enlarged_pores: {
        currentScore: 55,
        goal: 40,
        progress: 30,
        previousScore: 58,
        lastAnalyzed: new Date().toISOString()
      },
      uv_damage: {
        currentScore: 38,
        goal: 25,
        progress: 45,
        previousScore: 42,
        lastAnalyzed: new Date().toISOString()
      },
      dark_circles: {
        currentScore: 32,
        goal: 22,
        progress: 50,
        previousScore: 38,
        lastAnalyzed: new Date().toISOString()
      },
      under_eye_bags: {
        currentScore: 18,
        goal: 12,
        progress: 70,
        previousScore: 25,
        lastAnalyzed: new Date().toISOString()
      },
      nasolabial_folds: {
        currentScore: 42,
        goal: 30,
        progress: 40,
        previousScore: 48,
        lastAnalyzed: new Date().toISOString()
      },
      texture: {
        currentScore: 35,
        goal: 25,
        progress: 55,
        previousScore: 42,
        lastAnalyzed: new Date().toISOString()
      },
      clogged_pores: {
        currentScore: 22,
        goal: 15,
        progress: 65,
        previousScore: 28,
        lastAnalyzed: new Date().toISOString()
      },
      emerging_dark_spots: {
        currentScore: 18,
        goal: 12,
        progress: 70,
        previousScore: 24,
        lastAnalyzed: new Date().toISOString()
      }
    }
  }
};

export const PRODUCTS_DATA = {
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
      price: 28.99,
      rating: 4.6,
      description: 'Advanced serum to minimize pore appearance',
      ingredients: ['Niacinamide', 'Zinc PCA', 'Salicylic Acid'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Pore+Serum',
      targetAreas: ['enlarged_pores', 'clogged_pores']
    },
    {
      id: 'loreal-eye-cream',
      name: 'L\'Oréal Age Perfect Eye Cream',
      brand: 'L\'Oréal',
      price: 21.99,
      rating: 4.3,
      description: 'Firming eye cream for dark circles and puffiness',
      ingredients: ['Caffeine', 'Hyaluronic Acid', 'Peptides'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Eye+Cream',
      targetAreas: ['dark_circles', 'under_eye_bags']
    },
    {
      id: 'loreal-spot-corrector',
      name: 'L\'Oréal Dark Spot Corrector',
      brand: 'L\'Oréal',
      price: 26.99,
      rating: 4.4,
      description: 'Targeted treatment for dark spots and discoloration',
      ingredients: ['Kojic Acid', 'Vitamin C', 'Arbutin'],
      imageUrl: 'https://via.placeholder.com/200x200?text=L%27Oreal+Spot+Corrector',
      targetAreas: ['surface_spots', 'emerging_dark_spots', 'uv_damage']
    }
  ]
};

export const AI_RECOMMENDATIONS = {
  success: true,
  recommendations: [
    {
      area: 'wrinkles_fine_lines',
      severity: 'significant',
      priority: 'high',
      primaryIngredients: ['retinol', 'peptides', 'hyaluronic_acid'],
      recommendation: 'Focus on retinol-based treatments and incorporate peptide serums for comprehensive anti-aging benefits.',
      timeframe: '6-8 weeks',
      routine: {
        morning: ['gentle cleanser', 'peptide serum', 'moisturizer', 'sunscreen'],
        evening: ['oil cleanser', 'retinol treatment', 'hydrating serum', 'night cream']
      }
    },
    {
      area: 'surface_spots',
      severity: 'mild',
      priority: 'medium',
      primaryIngredients: ['vitamin_c', 'niacinamide', 'kojic_acid'],
      recommendation: 'Use vitamin C in the morning and targeted spot treatments in the evening for gradual improvement.',
      timeframe: '4-6 weeks',
      routine: {
        morning: ['gentle cleanser', 'vitamin c serum', 'moisturizer', 'broad spectrum spf'],
        evening: ['gentle cleanser', 'spot treatment', 'niacinamide serum', 'moisturizer']
      }
    },
    {
      area: 'enlarged_pores',
      severity: 'significant',
      priority: 'medium',
      primaryIngredients: ['niacinamide', 'salicylic_acid', 'zinc'],
      recommendation: 'Regular use of BHA and niacinamide will help minimize pore appearance over time.',
      timeframe: '4-6 weeks',
      routine: {
        morning: ['foaming cleanser', 'niacinamide serum', 'lightweight moisturizer', 'sunscreen'],
        evening: ['salicylic acid cleanser', 'BHA treatment', 'hydrating serum', 'gel moisturizer']
      }
    },
    {
      area: 'dark_circles',
      severity: 'mild',
      priority: 'low',
      primaryIngredients: ['caffeine', 'vitamin_k', 'peptides'],
      recommendation: 'Eye creams with caffeine and proper sleep hygiene will help reduce dark circle appearance.',
      timeframe: '3-4 weeks',
      routine: {
        morning: ['gentle eye cleanser', 'caffeine eye cream', 'color corrector if needed'],
        evening: ['makeup remover', 'peptide eye treatment', 'overnight eye mask weekly']
      }
    },
    {
      area: 'texture',
      severity: 'moderate',
      priority: 'medium',
      primaryIngredients: ['glycolic_acid', 'lactic_acid', 'urea'],
      recommendation: 'Gentle chemical exfoliation 2-3 times per week will smooth skin texture effectively.',
      timeframe: '3-5 weeks',
      routine: {
        morning: ['mild cleanser', 'hydrating toner', 'moisturizer', 'sunscreen'],
        evening: ['exfoliating cleanser', 'AHA treatment (alternate nights)', 'barrier repair serum', 'rich moisturizer']
      }
    },
    {
      area: 'clogged_pores',
      severity: 'mild',
      priority: 'medium',
      primaryIngredients: ['salicylic_acid', 'benzoyl_peroxide', 'tea_tree_oil'],
      recommendation: 'BHA treatments and oil cleansing will help clear clogged pores without over-drying.',
      timeframe: '2-4 weeks',
      routine: {
        morning: ['gel cleanser', 'light serum', 'non-comedogenic moisturizer', 'sunscreen'],
        evening: ['oil cleanser', 'BHA treatment', 'hydrating toner', 'lightweight moisturizer']
      }
    },
    {
      area: 'emerging_dark_spots',
      severity: 'mild',
      priority: 'medium',
      primaryIngredients: ['arbutin', 'kojic_acid', 'licorice_extract'],
      recommendation: 'Early intervention with gentle brightening agents will prevent dark spots from deepening.',
      timeframe: '4-6 weeks',
      routine: {
        morning: ['gentle cleanser', 'brightening serum', 'antioxidant moisturizer', 'high SPF sunscreen'],
        evening: ['cleansing oil', 'exfoliating toner', 'spot treatment', 'nourishing night cream']
      }
    },
    {
      area: 'red_areas',
      severity: 'mild',
      priority: 'low',
      primaryIngredients: ['centella_asiatica', 'niacinamide', 'green_tea'],
      recommendation: 'Anti-inflammatory ingredients and gentle skincare routine will calm redness over time.',
      timeframe: '2-3 weeks',
      routine: {
        morning: ['cream cleanser', 'calming toner', 'barrier repair serum', 'mineral sunscreen'],
        evening: ['micellar water', 'soothing essence', 'anti-inflammatory treatment', 'recovery cream']
      }
    },
    {
      area: 'uv_damage',
      severity: 'moderate',
      priority: 'high',
      primaryIngredients: ['vitamin_c', 'retinol', 'ferulic_acid'],
      recommendation: 'Antioxidant protection during the day and repair treatments at night are essential for UV damage.',
      timeframe: '8-12 weeks',
      routine: {
        morning: ['antioxidant cleanser', 'vitamin C + E serum', 'protective moisturizer', 'broad spectrum SPF 50+'],
        evening: ['double cleanse', 'retinol treatment', 'repair serum', 'intensive night cream']
      }
    },
    {
      area: 'nasolabial_folds',
      severity: 'significant',
      priority: 'medium',
      primaryIngredients: ['peptides', 'hyaluronic_acid', 'collagen_boosters'],
      recommendation: 'Hydrating treatments and collagen-stimulating ingredients will help improve fold appearance.',
      timeframe: '6-10 weeks',
      routine: {
        morning: ['hydrating cleanser', 'peptide complex', 'plumping moisturizer', 'anti-aging sunscreen'],
        evening: ['cleansing balm', 'hyaluronic acid serum', 'collagen booster', 'firming night treatment']
      }
    },
    {
      area: 'under_eye_bags',
      severity: 'mild',
      priority: 'low',
      primaryIngredients: ['caffeine', 'peptides', 'arnica'],
      recommendation: 'Depuffing treatments and lifestyle modifications will help reduce under-eye puffiness.',
      timeframe: '2-4 weeks',
      routine: {
        morning: ['cool eye patches', 'depuffing eye cream', 'concealer with SPF'],
        evening: ['gentle eye makeup remover', 'firming eye serum', 'overnight depuffing mask']
      }
    }
  ]
};

export const REWARDS_DATA = {
  success: true,
  data: {
    userId: 'user123',
    currentPoints: 1250,
    membershipLevel: 'Gold',
    nextLevelThreshold: 2000,
    availableRewards: [
      {
        id: 'reward-1',
        name: 'Free L\'Oréal Revitalift Serum',
        pointsCost: 500,
        description: 'Premium anti-aging serum worth $24.99',
        category: 'Products',
        inStock: true
      },
      {
        id: 'reward-2',
        name: 'Virtual Skincare Consultation',
        pointsCost: 800,
        description: '30-minute consultation with L\'Oréal skincare expert',
        category: 'Services',
        inStock: true
      },
      {
        id: 'reward-3',
        name: '20% Off Next Purchase',
        pointsCost: 300,
        description: 'Discount code for your next L\'Oréal purchase',
        category: 'Discounts',
        inStock: true
      }
    ],
    recentActivity: [
      {
        id: 'activity-1',
        type: 'points_earned',
        description: 'Completed daily skin analysis',
        points: 50,
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'activity-2',
        type: 'reward_redeemed',
        description: 'Redeemed travel-size moisturizer',
        points: -200,
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ]
  }
};
