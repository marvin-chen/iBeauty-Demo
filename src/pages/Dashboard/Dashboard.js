import React, { useState, useEffect } from 'react';
import SkinAreasGrid from '../../components/AIBot/SkinAreasGrid/SkinAreasGrid';
import AIBot from '../../components/AIBot/AIBot/AIBot';
import { getUserSkinStats } from '../../services/api';
import { timeAgo } from '../../utils/helpers';
import './Dashboard.css';

function Dashboard() {
  const [skinData, setSkinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIAnalyzing, setShowAIAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSkinData();
  }, []);

  const loadSkinData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserSkinStats('user123'); // Mock user ID
      setSkinData(data.data || data);
    } catch (error) {
      console.error('Error loading skin data:', error);
      setError('Failed to load skin analysis data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setShowAIAnalyzing(true);
  };

  const handleAIComplete = () => {
    setShowAIAnalyzing(false);
    // Simulate new analysis results
    loadSkinData();
  };

  const getOverallHealthScore = () => {
    if (!skinData?.areas) return 0;
    
    const areas = Object.values(skinData.areas);
    const totalScore = areas.reduce((sum, area) => sum + (area.currentScore || 0), 0);
    const avgScore = totalScore / areas.length;
    
    // Convert to health score (lower skin concern scores = higher health score)
    return Math.max(100 - avgScore, 0);
  };

  const getHealthCategory = (score) => {
    if (score >= 80) return { category: 'Excellent', color: 'var(--color-success)' };
    if (score >= 60) return { category: 'Good', color: 'var(--color-primary)' };
    if (score >= 40) return { category: 'Fair', color: 'var(--color-warning)' };
    return { category: 'Needs Attention', color: 'var(--color-danger)' };
  };

  const getImprovementCount = () => {
    if (!skinData?.areas) return 0;
    
    return Object.values(skinData.areas).filter(area => 
      area.previousScore && area.currentScore < area.previousScore
    ).length;
  };

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={loadSkinData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const overallScore = getOverallHealthScore();
  const healthInfo = getHealthCategory(overallScore);
  const improvementCount = getImprovementCount();

  return (
    <div className="dashboard">
      {showAIAnalyzing && (
        <AIBot 
          message="Analyzing your skin across all 8 concern areas... Setting personalized improvement goals based on your unique profile..."
          isActive={true}
          type="analyzing"
          duration={4000}
          onComplete={handleAIComplete}
        />
      )}

      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Your Skin Health Dashboard</h1>
            <p className="subtitle">
              Track your progress across 8 key skin concern areas with AI-powered insights
            </p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card overall-health">
              <div className="stat-icon" style={{ backgroundColor: healthInfo.color }}>
                <span>❤️</span>
              </div>
              <div className="stat-content">
                <div className="stat-value" style={{ color: healthInfo.color }}>
                  {Math.round(overallScore)}
                </div>
                <div className="stat-label">Overall Health Score</div>
                <div className="stat-category" style={{ color: healthInfo.color }}>
                  {healthInfo.category}
                </div>
              </div>
            </div>

            <div className="stat-card improvements">
              <div className="stat-icon">
                <span>📈</span>
              </div>
              <div className="stat-content">
                <div className="stat-value text-success">{improvementCount}</div>
                <div className="stat-label">Areas Improved</div>
                <div className="stat-description">Since last analysis</div>
              </div>
            </div>

            <div className="stat-card last-analysis">
              <div className="stat-icon">
                <span>🕐</span>
              </div>
              <div className="stat-content">
                <div className="stat-value">{timeAgo(skinData?.lastUpdated)}</div>
                <div className="stat-label">Last Analysis</div>
                <div className="stat-description">Skin assessment</div>
              </div>
            </div>
          </div>

          <div className="action-section">
            <button 
              className="btn-primary new-analysis-btn"
              onClick={handleNewAnalysis}
              disabled={showAIAnalyzing || isLoading}
            >
              {showAIAnalyzing ? (
                <>
                  <div className="btn-spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔬</span>
                  Start New AI Analysis
                </>
              )}
            </button>
            
            <button className="btn-outline view-history-btn">
              <span className="btn-icon">📊</span>
              View History
            </button>
          </div>
        </div>
      </div>

      <SkinAreasGrid 
        skinData={skinData} 
        isLoading={isLoading}
      />

      {skinData?.areas && (
        <div className="dashboard-footer">
          <div className="footer-content">
            <div className="recommendations-preview">
              <h3>Quick Tips</h3>
              <ul>
                <li>💧 Stay hydrated for better skin texture</li>
                <li>☀️ Use SPF daily to prevent UV damage</li>
                <li>🧴 Follow your personalized skincare routine</li>
              </ul>
            </div>
            
            <div className="next-analysis">
              <h3>Next Analysis Recommended</h3>
              <p>In 2-4 weeks to track your progress</p>
              <button className="btn-sm btn-outline">
                Schedule Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
