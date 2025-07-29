// Vercel serverless function for AI recommendations (nested route)
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
      }
    ]
  };

  res.status(200).json(recommendations);
}