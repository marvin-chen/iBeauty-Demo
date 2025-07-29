import React, { useState, useEffect } from 'react';
import SkinAreasGrid from '../../components/AIBot/SkinAreasGrid/SkinAreasGrid';
import AIBot from '../../components/AIBot/AIBot/AIBot';
import AIRecommendations from '../../components/AIRecommendations/AIRecommendations';
import { getUserSkinStats } from '../../services/api';
import { timeAgo } from '../../utils/helpers';
import './Dashboard.css';

function Dashboard() {
  const [skinData, setSkinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIAnalyzing, setShowAIAnalyzing] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
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

  // Mock history data
  const mockHistoryData = [
    {
      id: 1,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      overallScore: 72,
      areas: {
        wrinkles_fine_lines: 48,
        surface_spots: 32,
        red_areas: 30,
        enlarged_pores: 58,
        uv_damage: 42,
        dark_circles: 38,
        under_eye_bags: 35,
        nasolabial_folds: 44
      },
      improvements: ['Started new serum routine', 'Increased water intake']
    },
    {
      id: 2,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      overallScore: 68,
      areas: {
        wrinkles_fine_lines: 52,
        surface_spots: 35,
        red_areas: 33,
        enlarged_pores: 62,
        uv_damage: 45,
        dark_circles: 42,
        under_eye_bags: 38,
        nasolabial_folds: 47
      },
      improvements: ['Added SPF to daily routine']
    },
    {
      id: 3,
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      overallScore: 64,
      areas: {
        wrinkles_fine_lines: 55,
        surface_spots: 38,
        red_areas: 36,
        enlarged_pores: 65,
        uv_damage: 48,
        dark_circles: 45,
        under_eye_bags: 42,
        nasolabial_folds: 50
      },
      improvements: ['Initial assessment']
    }
  ];

  const handleViewHistory = () => {
    setShowHistoryModal(true);
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false);
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
                <i className="fas fa-heart"></i>
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
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-content">
                <div className="stat-value text-success">{improvementCount}</div>
                <div className="stat-label">Areas Improved</div>
                <div className="stat-description">Since last analysis</div>
              </div>
            </div>

            <div className="stat-card last-analysis">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
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
                  Start New AI Analysis
                </>
              )}
            </button>
            
            <button 
              className="btn-secondary ai-recommendations-btn"
              onClick={() => setShowAIRecommendations(!showAIRecommendations)}
              disabled={isLoading || !skinData}
            >
              {showAIRecommendations ? 'Hide' : 'Get'} AI Recommendations
            </button>
            
            <button 
              className="btn-secondary view-history-btn"
              onClick={handleViewHistory}
            >
              View History
            </button>
          </div>
        </div>
      </div>

      {showAIRecommendations && skinData && (
        <AIRecommendations 
          skinData={skinData} 
          className="dashboard-ai-recommendations"
        />
      )}

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

      {/* History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay" onClick={handleCloseHistory}>
          <div className="history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-history"></i>
                Analysis History
              </h2>
              <button className="close-btn" onClick={handleCloseHistory}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="history-timeline">
                {mockHistoryData.map((entry, index) => (
                  <div key={entry.id} className="history-entry">
                    <div className="entry-header">
                      <div className="entry-date">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{new Date(entry.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="entry-score">
                        <span className="score-label">Overall Score</span>
                        <span className="score-value">{entry.overallScore}</span>
                      </div>
                    </div>
                    
                    <div className="entry-details">
                      <div className="areas-summary">
                        <h4>Areas Analysis</h4>
                        <div className="areas-grid">
                          {Object.entries(entry.areas).slice(0, 4).map(([areaKey, score]) => (
                            <div key={areaKey} className="area-item">
                              <span className="area-name">
                                {areaKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                              <span className="area-score">{score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {entry.improvements && entry.improvements.length > 0 && (
                        <div className="improvements">
                          <h4>Notes & Improvements</h4>
                          <ul>
                            {entry.improvements.map((improvement, idx) => (
                              <li key={idx}>
                                <i className="fas fa-check-circle"></i>
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {index > 0 && (
                      <div className="progress-indicator">
                        <span className={`trend ${entry.overallScore > mockHistoryData[index - 1].overallScore ? 'improving' : 'declining'}`}>
                          <i className={`fas fa-arrow-${entry.overallScore > mockHistoryData[index - 1].overallScore ? 'up' : 'down'}`}></i>
                          {entry.overallScore > mockHistoryData[index - 1].overallScore ? 'Improving' : 'Needs Attention'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="history-insights">
                <h3>
                  <i className="fas fa-chart-line"></i>
                  Progress Insights
                </h3>
                <div className="insights-grid">
                  <div className="insight-card">
                    <div className="insight-icon">📈</div>
                    <div className="insight-content">
                      <h4>Best Improvement</h4>
                      <p>Surface spots reduced by 25% over 3 weeks</p>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">🎯</div>
                    <div className="insight-content">
                      <h4>Focus Area</h4>
                      <p>Continue targeting enlarged pores with current routine</p>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">⭐</div>
                    <div className="insight-content">
                      <h4>Achievement</h4>
                      <p>Consistency streak: 21 days of following routine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseHistory}>
                Close
              </button>
              <button className="btn-primary">
                <i className="fas fa-download"></i>
                Export History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
