// backend/services/aiService.js
class AIService {
  constructor() {
    this.skinConcernDatabase = {
      wrinkles_fine_lines: {
        causes: ['aging', 'sun_damage', 'dehydration', 'genetics'],
        ingredients: ['retinol', 'vitamin_c', 'hyaluronic_acid', 'peptides'],
        routine: ['gentle_cleanser', 'vitamin_c_serum', 'moisturizer', 'spf'],
        tips: ['Use sunscreen daily', 'Stay hydrated', 'Get adequate sleep']
      },
      surface_spots: {
        causes: ['sun_damage', 'hormones', 'acne_scarring'],
        ingredients: ['niacinamide', 'vitamin_c', 'alpha_arbutin', 'kojic_acid'],
        routine: ['gentle_cleanser', 'brightening_serum', 'moisturizer', 'spf'],
        tips: ['Avoid picking at skin', 'Use broad-spectrum SPF', 'Be patient with treatments']
      },
      red_areas: {
        causes: ['inflammation', 'sensitivity', 'rosacea', 'irritation'],
        ingredients: ['niacinamide', 'centella_asiatica', 'azelaic_acid', 'ceramides'],
        routine: ['gentle_cleanser', 'calming_serum', 'barrier_cream', 'mineral_spf'],
        tips: ['Avoid harsh scrubbing', 'Use fragrance-free products', 'Patch test new products']
      },
      enlarged_pores: {
        causes: ['genetics', 'oily_skin', 'aging', 'clogged_pores'],
        ingredients: ['salicylic_acid', 'niacinamide', 'retinol', 'clay_masks'],
        routine: ['oil_cleanser', 'bha_exfoliant', 'niacinamide_serum', 'lightweight_moisturizer'],
        tips: ['Use oil cleansing method', 'Exfoliate regularly', 'Avoid over-cleansing']
      },
      uv_damage: {
        causes: ['sun_exposure', 'lack_of_protection', 'accumulated_damage'],
        ingredients: ['vitamin_c', 'vitamin_e', 'ferulic_acid', 'zinc_oxide'],
        routine: ['antioxidant_cleanser', 'vitamin_c_serum', 'repair_moisturizer', 'broad_spectrum_spf'],
        tips: ['Reapply sunscreen every 2 hours', 'Seek shade during peak hours', 'Wear protective clothing']
      },
      texture: {
        causes: ['dead_skin_buildup', 'dehydration', 'over_exfoliation'],
        ingredients: ['aha', 'bha', 'lactic_acid', 'urea'],
        routine: ['gentle_cleanser', 'exfoliating_treatment', 'hydrating_serum', 'occlusive_moisturizer'],
        tips: ['Exfoliate 2-3 times per week', 'Follow with hydration', 'Start slowly with acids']
      },
      clogged_pores: {
        causes: ['excess_oil', 'dead_skin_cells', 'comedogenic_products'],
        ingredients: ['salicylic_acid', 'benzoyl_peroxide', 'retinoids', 'clay'],
        routine: ['oil_cleanser', 'salicylic_acid_cleanser', 'treatment_serum', 'non_comedogenic_moisturizer'],
        tips: ['Double cleanse daily', 'Use non-comedogenic products', 'Change pillowcases regularly']
      },
      emerging_dark_spots: {
        causes: ['post_inflammatory_hyperpigmentation', 'hormones', 'sun_exposure'],
        ingredients: ['hydroquinone', 'arbutin', 'vitamin_c', 'licorice_root'],
        routine: ['gentle_cleanser', 'brightening_treatment', 'hydrating_serum', 'spf_50'],
        tips: ['Start treatment early', 'Be consistent with routine', 'Never skip sunscreen']
      }
    };
  }

  async generatePersonalizedRecommendations(skinData, userProfile = {}) {
    try {
      const recommendations = {};
      const priorityAreas = this.identifyPriorityAreas(skinData.areas);
      
      // Generate recommendations for each skin area
      for (const [area, areaInfo] of Object.entries(skinData.areas)) {
        const areaData = this.skinConcernDatabase[area];
        if (!areaData) continue;

        const score = areaInfo.currentScore || areaInfo; // Handle both object and number formats
        
        // Validate score is a number
        if (typeof score !== 'number' || isNaN(score)) {
          console.warn(`Invalid score for area ${area}:`, score);
          continue;
        }

        recommendations[area] = {
          severity: this.getSeverityLevel(score),
          primaryIngredients: this.selectIngredients(areaData, score),
          routine: this.buildAreaRoutine(areaData, score),
          tips: areaData.tips || [],
          timeframe: this.estimateTimeframe(score),
          priority: priorityAreas.includes(area) ? 'high' : 'medium'
        };
      }

      // Generate overall routine
      const consolidatedRoutine = this.consolidateRoutines(recommendations);
      
      // Generate AI insights
      const insights = this.generateInsights(skinData, recommendations);

      return {
        success: true,
        recommendations,
        consolidatedRoutine,
        insights,
        confidence: 0.85,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI recommendation error:', error);
      return this.generateFallbackRecommendations();
    }
  }

  identifyPriorityAreas(areas) {
    const sortedAreas = Object.entries(areas)
      .map(([area, areaInfo]) => [area, areaInfo.currentScore || areaInfo])
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([area]) => area);
    
    return sortedAreas;
  }

  getSeverityLevel(score) {
    if (score <= 20) return 'mild';
    if (score <= 40) return 'moderate';
    if (score <= 60) return 'significant';
    return 'severe';
  }

  selectIngredients(areaData, score) {
    const intensity = score > 40 ? 2 : 1;
    return areaData.ingredients.slice(0, 2 + intensity);
  }

  buildAreaRoutine(areaData, score) {
    const baseRoutine = areaData.routine;
    if (score > 50) {
      return [...baseRoutine, 'intensive_treatment'];
    }
    return baseRoutine;
  }

  estimateTimeframe(score) {
    if (score <= 30) return '4-6 weeks';
    if (score <= 50) return '8-12 weeks';
    return '12-16 weeks';
  }

  consolidateRoutines(recommendations) {
    const morning = [
      'gentle_cleanser',
      'vitamin_c_serum',
      'niacinamide_serum',
      'moisturizer',
      'broad_spectrum_spf'
    ];

    const evening = [
      'oil_cleanser',
      'gentle_cleanser',
      'treatment_serum',
      'hydrating_serum',
      'night_moisturizer'
    ];

    return { morning, evening };
  }

  generateInsights(skinData, recommendations) {
    const insights = [];
    const scores = Object.values(skinData.areas);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    // Overall assessment
    if (avgScore < 30) {
      insights.push({
        type: 'positive',
        title: 'Great Skin Health!',
        message: 'Your skin is in excellent condition. Focus on maintenance and prevention.',
        icon: '✨'
      });
    } else if (avgScore < 50) {
      insights.push({
        type: 'neutral',
        title: 'Good Foundation',
        message: 'Your skin has a solid foundation. Target specific areas for improvement.',
        icon: '👍'
      });
    } else {
      insights.push({
        type: 'actionable',
        title: 'Improvement Opportunity',
        message: 'Multiple areas would benefit from a consistent skincare routine.',
        icon: '🎯'
      });
    }

    // Specific insights
    if (skinData.areas.uv_damage > 40) {
      insights.push({
        type: 'warning',
        title: 'Sun Protection Priority',
        message: 'UV damage is a concern. Daily SPF 30+ is essential for preventing further damage.',
        icon: '☀️'
      });
    }

    if (skinData.areas.red_areas > 35) {
      insights.push({
        type: 'tip',
        title: 'Gentle Approach Needed',
        message: 'Your skin shows signs of sensitivity. Introduce new products gradually.',
        icon: '🌸'
      });
    }

    return insights;
  }

  generateFallbackRecommendations() {
    return {
      success: false,
      message: 'Using basic recommendations due to analysis limitation',
      recommendations: {
        basic: {
          routine: ['gentle_cleanser', 'moisturizer', 'sunscreen'],
          tips: ['Consistency is key', 'Patch test new products', 'Stay hydrated']
        }
      },
      confidence: 0.6
    };
  }

  async generateSmartGoals(currentScores, userGoals = {}) {
    const goals = {};
    
    for (const [area, currentScore] of Object.entries(currentScores)) {
      const severity = this.getSeverityLevel(currentScore);
      let targetReduction;
      
      switch (severity) {
        case 'mild':
          targetReduction = Math.min(currentScore * 0.2, 5);
          break;
        case 'moderate':
          targetReduction = Math.min(currentScore * 0.3, 12);
          break;
        case 'significant':
          targetReduction = Math.min(currentScore * 0.25, 15);
          break;
        default:
          targetReduction = Math.min(currentScore * 0.2, 10);
      }

      goals[area] = {
        current: currentScore,
        target: Math.max(currentScore - targetReduction, 5),
        timeframe: this.estimateTimeframe(currentScore),
        difficulty: severity,
        achievable: targetReduction > 0
      };
    }

    return {
      goals,
      motivation: this.generateMotivationalMessage(goals),
      tips: this.generateGoalTips(goals)
    };
  }

  generateMotivationalMessage(goals) {
    const achievableGoals = Object.values(goals).filter(g => g.achievable).length;
    const totalGoals = Object.keys(goals).length;
    
    if (achievableGoals === totalGoals) {
      return "🌟 All your goals are achievable with consistent effort! You've got this!";
    } else if (achievableGoals > totalGoals * 0.7) {
      return "💪 Most of your goals are within reach. Focus on the key areas for best results!";
    } else {
      return "🎯 Let's start with smaller, achievable goals and build momentum from there!";
    }
  }

  generateGoalTips(goals) {
    return [
      "📅 Track your progress weekly to stay motivated",
      "🔄 Consistency beats perfection - stick to your routine",
      "📸 Take progress photos to see changes over time",
      "💧 Remember: hydration and sleep affect skin health too"
    ];
  }
}

module.exports = new AIService();
