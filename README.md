# L'Oréal iBeauty Demo - Professional AI Skin Analysis Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)
[![L'Oréal](https://img.shields.io/badge/L'Oréal-Branded-gold.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **L'Oréal branded React application** featuring professional AI-driven skin analysis with sophisticated animations and comprehensive skincare recommendations. This production-ready platform showcases advanced frontend development, professional UI/UX design, and enterprise-grade deployment architecture with complete API fallback systems.


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

### Production-Ready Architecture
- **Vercel Deployment** - One-click deployment with automatic builds
- **Complete API Fallbacks** - Comprehensive fallback system for zero-downtime experience
- **Responsive Design** - Mobile-first approach with professional styling
- **Error Handling** - Graceful fallbacks and user-friendly error states
- **Performance Optimized** - 74KB bundle with optimized assets

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

## Project Architecture

```
ibeauty-demo/
├── public/                    # Static assets & manifest
├── src/                       # React application source
│   ├── components/            # Reusable UI components
│   │   ├── AIBot/            # Professional AI analysis animations
│   │   │   ├── AIBot.js      # Flowing circular animation with L'Oréal badge
│   │   │   └── AIBot.css     # Professional animation styling
│   │   ├── AIRecommendations/ # AI insights display
│   │   └── ImageUpload/      # File upload handling
│   ├── pages/                # Application pages
│   │   ├── Dashboard/        # Main dashboard with enhanced animations
│   │   ├── AreaDetail/       # Individual skin area analysis
│   │   ├── About/           # Application information
│   │   └── Rewards/         # User rewards and points system
│   ├── services/            
│   │   └── api.js           # Complete API service with fallback system
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions and skin area definitions
│   └── styles/              # Global styling and L'Oréal theme variables
├── api/                     # Vercel serverless functions (fallback ready)
├── backend/                 # Optional Express server for development
├── build/                   # Production build output
├── vercel.json             # Vercel deployment configuration
├── DEPLOYMENT.md           # Detailed deployment instructions
└── package.json            # Dependencies and scripts
```

---

**Ready to experience the future of AI-powered skincare?** 
