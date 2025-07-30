# L'Oréal iBeauty Demo 

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **L'Oréal branded application** featuring professional AI-driven skin analysis with comprehensive skincare recommendations. This is a proof of concept to simulate a professional AI skin analysis platform.


## Features

### Advanced Skin Analysis
- **8 Comprehensive Skin Areas** 
- **AI-Powered Insights** 
- **Results Comparison Modal** 
- **Progress Tracking** 
- **Smart Goal Setting** 

### L'Oréal Product Integration
- **Curated Product Recommendations** - Premium L'Oréal skincare catalog
- **Targeted Solutions** - Products matched to specific skin concerns
- **Detailed Product Information** - Ingredients, pricing, ratings, and benefits
- **Routine Recommendations** - Morning and evening skincare routines

### Rewards
- **Points System** - Earn rewards for consistent app usage
- **Gold Member Status** - Level progression with exclusive benefits
- **Redeemable Rewards** - L'Oréal products, consultations, and discounts
- **Achievement Tracking** - Progress milestones and improvement celebrations

## Quick Deploy to Production

### Vercel CLI
```bash
npm install -g vercel
cd /path/to/ibeauty-demo
vercel
```

### Local Development

#### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

#### Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/marvin-chen/iBeauty-Demo.git
   cd ibeauty-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Opens at: **http://localhost:3000**

4. **Build for production**
   ```bash
   npm run build
   ```

## Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks and functional components
- **JavaScript ES6+** - Modern JavaScript features and async/await patterns
- **CSS3** - Custom styling with CSS Grid, Flexbox, and animations
- **Axios** - HTTP client for API requests with intelligent fallback system

### Backend & Data
- **Node.js** - JavaScript runtime for serverless functions
- **Express.js** - Web framework for optional backend server
- **JSON** - Structured data storage for user profiles and product catalog
- **Centralized Mock Data** - Single source of truth data architecture

### Deployment & Infrastructure
- **Vercel** - Serverless deployment platform with automatic CI/CD
- **Vercel Functions** - Serverless API endpoints for production
- **Static Site Generation** - Optimized React build for fast loading
- **CORS Support** - Cross-origin resource sharing for API access

### Development Tools
- **npm** - Package management and build scripts
- **Create React App** - Development environment and build tooling
- **React Router** - Client-side routing for single-page application
- **Git** - Version control with GitHub integration

### AI & Analytics Simulation
- **Mock AI Engine** - Simulated skin analysis algorithms
- **Dynamic Scoring** - Real-time skin assessment calculations
- **Progress Tracking** - Temporal analysis and improvement metrics
- **Recommendation Engine** - Product matching based on skin concerns

## Project Architecture

```
ibeauty-demo/
├── public/                    # Static assets & manifest
├── src/                       # React application source
│   ├── components/            # Reusable UI components
│   │   ├── AIBot/            # Professional AI analysis animations
│   │   │   ├── AIBot/        # Flowing circular animation with L'Oréal badge
│   │   │   ├── Header/       # Application header component
│   │   │   └── SkinAreasGrid/ # Skin areas grid layout
│   │   ├── AIRecommendations/ # AI insights display with modal system
│   │   ├── BackToTop/        # Floating back-to-top button
│   │   ├── ProductRecommendation/ # Product recommendation cards
│   │   ├── ProgressBar/      # Progress visualization component
│   │   ├── ScrollToTop/      # Auto scroll to top functionality
│   │   └── SkinAreaCard/     # Individual skin area cards
│   ├── pages/                # Application pages
│   │   ├── Dashboard/        # Main dashboard with enhanced animations
│   │   ├── AreaDetail/       # Individual skin area analysis
│   │   ├── About/           # Application information with project details
│   │   └── Rewards/         # User rewards and points system
│   ├── context/             # React context providers
│   │   └── AppContext.js    # Global application state
│   ├── data/                # Centralized data management
│   │   └── mockData.js      # Single source of truth for all app data
│   ├── services/            # API and external service integrations
│   │   ├── api.js           # Complete API service with fallback system
│   │   ├── api-clean.js     # Clean API implementation
│   │   └── api-old.js       # Legacy API functions
│   ├── utils/               # Helper functions and utilities
│   │   ├── helpers.js       # General utility functions
│   │   └── skinAreas.js     # Skin area definitions and calculations
│   ├── styles/              # Global styling and L'Oréal theme variables
│   │   ├── globals.css      # Global styles
│   │   └── variables.css    # CSS custom properties
│   ├── ProductRecommendation/ # Legacy component directory
│   │   └── ProductRecommendation.css # Product styling
│   ├── ProgressBar/         # Legacy component directory
│   │   └── ProgressBar.css  # Progress bar styling
│   ├── SkinAreaCard/        # Legacy component directory
│   │   └── SkinAreaCard.js  # Legacy skin area component
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── api/                     # Vercel serverless functions
│   ├── ai-recommendations.js # AI analysis endpoint
│   ├── skin-stats.js       # User skin statistics
│   ├── ai/                 # AI-related endpoints
│   ├── products/           # Product recommendation endpoints
│   └── users/              # User-specific endpoints
├── backend/                 # Optional Express server for development
│   ├── server.js           # Express server setup
│   ├── config/             # Server configuration
│   ├── data/               # Backend data files
│   ├── middleware/         # Express middleware
│   ├── models/             # Data models
│   └── services/           # Backend services
├── build/                   # Production build output
├── vercel.json             # Vercel deployment configuration
├── verify-data-consistency.js # Data validation script
└── package.json            # Dependencies and scripts
```

---

**Ready to experience the future of AI-powered skincare?** 
