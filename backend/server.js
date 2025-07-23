const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data
const mockSkinData = {
  success: true,
  data: {
    areas: {
      wrinkles_fine_lines: { 
        currentScore: 42, 
        goal: 32, 
        progress: 60, 
        previousScore: 48,
        lastAnalyzed: new Date().toISOString()
      },
      surface_spots: { 
        currentScore: 28, 
        goal: 20, 
        progress: 75, 
        previousScore: 32,
        lastAnalyzed: new Date().toISOString()
      },
      red_areas: { 
        currentScore: 25, 
        goal: 15, 
        progress: 40, 
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
      texture: { 
        currentScore: 35, 
        goal: 25, 
        progress: 60, 
        previousScore: 40,
        lastAnalyzed: new Date().toISOString()
      },
      clogged_pores: { 
        currentScore: 22, 
        goal: 15, 
        progress: 70, 
        previousScore: 28,
        lastAnalyzed: new Date().toISOString()
      },
      emerging_dark_spots: { 
        currentScore: 18, 
        goal: 12, 
        progress: 65, 
        previousScore: 22,
        lastAnalyzed: new Date().toISOString()
      }
    },
    rewards: {
      points: 150,
      badges: ['First Analysis', 'Progress Maker', 'Consistency Champion']
    },
    lastUpdated: new Date().toISOString()
  }
};

const mockProducts = {
  success: true,
  products: [
    {
      id: '1',
      name: 'Hydrating Serum',
      brand: 'iBeauty Pro',
      price: 29.99,
      salePrice: 24.99,
      image: '/placeholder-product.jpg',
      description: 'Advanced hydrating serum with hyaluronic acid for deep moisturization.',
      keyBenefits: ['Deep hydration', 'Plumping effect', 'Suitable for all skin types'],
      ingredients: ['Hyaluronic Acid', 'Vitamin B5', 'Niacinamide'],
      howToUse: 'Apply morning and evening after cleansing.',
      rating: 4.5,
      reviewCount: 1250,
      recommendation_reason: 'Perfect for improving skin hydration and texture based on your analysis.',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Brightening Treatment',
      brand: 'iBeauty Pro',
      price: 34.99,
      image: '/placeholder-product.jpg',
      description: 'Gentle brightening treatment to reduce dark spots and even skin tone.',
      keyBenefits: ['Reduces dark spots', 'Evens skin tone', 'Gentle formula'],
      ingredients: ['Vitamin C', 'Alpha Arbutin', 'Kojic Acid'],
      howToUse: 'Apply in the evening after cleansing, 3 times per week.',
      rating: 4.2,
      reviewCount: 890,
      recommendation_reason: 'Helps target surface spots and emerging dark spots identified in your analysis.',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Gentle Cleanser',
      brand: 'iBeauty Pro',
      price: 19.99,
      image: '/placeholder-product.jpg',
      description: 'Gentle daily cleanser that removes impurities without stripping the skin.',
      keyBenefits: ['Deep cleansing', 'Non-stripping', 'pH balanced'],
      ingredients: ['Ceramides', 'Glycerin', 'Salicylic Acid'],
      howToUse: 'Use morning and evening. Massage onto damp skin, then rinse.',
      rating: 4.7,
      reviewCount: 2100,
      recommendation_reason: 'Essential for maintaining clean pores and preventing congestion.',
      priority: 'low'
    }
  ]
};

// API Routes
app.get('/api/users/:userId/skin-stats', (req, res) => {
  try {
    // Simulate API delay
    setTimeout(() => {
      res.json(mockSkinData);
    }, 500);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/users/:userId/skin-stats', (req, res) => {
  try {
    // In a real app, you'd save the data to a database
    res.json({ success: true, message: 'Skin stats updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/recommendations/:areaId', (req, res) => {
  try {
    setTimeout(() => {
      res.json(mockProducts);
    }, 300);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/users/:userId/rewards', (req, res) => {
  try {
    res.json({
      success: true,
      rewards: mockSkinData.data.rewards
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 iBeauty Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
