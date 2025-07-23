# iBeauty Demo - AI-Driven Skin Health Tracking

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.1-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A sophisticated **React + Node.js** application demonstrating gamified skin health tracking with **AI-driven personalized goals**. This demo showcases modern web development practices, interactive UI components, and a complete full-stack architecture for beauty and skincare applications.


## Features

### Core Functionality
- **8 Skin Concern Area Tracking** - Comprehensive skin health monitoring
- **AI-Powered Goal Setting** - Intelligent recommendations with smooth animations
- **Real-time Progress Tracking** - Visual progress indicators and score improvements
- **Interactive Dashboard** - Modern, responsive interface with health metrics
- **Product Recommendations** - Personalized skincare suggestions

### Gamification Elements
- **Health Score System** - Overall skin health scoring (0-100)
- **Progress Visualization** - Beautiful progress bars and improvement tracking
- **Achievement Tracking** - Monitor improvements across different skin areas
- **Rewards System** - Points and badges for consistent usage

### Technical Features
- **Responsive Design** - Mobile-first approach with modern CSS
- **RESTful API** - Complete backend with Express.js
- **Component Architecture** - Modular React components
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Development Tools** - Hot reload, ESLint, and development server

## Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ibeauty-demo.git
   cd ibeauty-demo
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Start Both Servers Simultaneously (Recommended)
```bash
npm run dev
```
This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

#### Option 2: Start Servers Separately

**Terminal 1 - Backend Server:**
```bash
cd backend
PORT=3001 npm run dev
```

**Terminal 2 - Frontend Server:**
```bash
npm start
```

## Project Structure

```
ibeauty-demo/
├── public/                 # Static assets
├── src/                    # React frontend source
│   ├── components/         # Reusable components
│   │   └── AIBot/         # AI animation components
│   ├── pages/             # Page components
│   │   ├── Dashboard/     # Main dashboard
│   │   └── AreaDetail/    # Skin area details
│   ├── services/          # API services
│   ├── utils/             # Helper functions
│   └── styles/            # Global styles
├── backend/               # Node.js backend
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── data/              # Mock data files
├── package.json           # Frontend dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

## Available Scripts

### Frontend Commands
| Command | Description |
|---------|-------------|
| `npm start` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm test` | Run test suite |
| `npm run dev` | Start both frontend and backend |

### Backend Commands
| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with nodemon (auto-restart) |

## Key Components

### Dashboard Features
- **Health Score Overview** - Real-time skin health metrics
- **8 Skin Areas Grid** - Interactive cards for each concern area
- **AI Analysis Button** - Trigger new skin analysis with animations
- **Progress Statistics** - Track improvements over time

### Skin Area Details
- **Individual Progress Tracking** - Detailed view for each skin concern
- **Product Recommendations** - Personalized skincare suggestions
- **AI Goal Setting** - Interactive goal adjustment with AI feedback

### AI Bot Animation
- **Typing Animation** - Realistic text typing effects
- **Processing Visualization** - Brain activity and progress indicators
- **Floating Particles** - Smooth CSS animations
