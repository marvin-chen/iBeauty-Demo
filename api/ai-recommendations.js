// Vercel serverless function for AI recommendations
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const recommendations = {
    success: true,
    recommendations: [
      {
        area: 'wrinkles_fine_lines',
        severity: 'moderate',
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
        severity: 'moderate',
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
        priority: 'high',
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
        severity: 'moderate',
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

  res.status(200).json(recommendations);
}