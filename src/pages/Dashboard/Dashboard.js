import React, { useState, useEffect } from 'react';
import SkinAreasGrid from '../../components/AIBot/SkinAreasGrid/SkinAreasGrid';
import AIBot from '../../components/AIBot/AIBot/AIBot';
import AIRecommendations from '../../components/AIRecommendations/AIRecommendations';
import { getUserSkinStats } from '../../services/api';
import { useDemoUser } from '../../context/DemoUserContext';
import { saveUserGoals } from '../../data/demoDataHelper';
import { timeAgo } from '../../utils/helpers';
import './Dashboard.css';

function Dashboard() {
  const [skinData, setSkinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIAnalyzing, setShowAIAnalyzing] = useState(false);
  const [showAnalysisComplete, setShowAnalysisComplete] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [analysisComparison, setAnalysisComparison] = useState(null);
  const [error, setError] = useState(null);
  
  // Use demo user context
  const { currentDemoUser } = useDemoUser();

  useEffect(() => {
    const loadData = async () => {
      // Don't load data until we have a valid currentDemoUser
      if (!currentDemoUser) {
        console.log('⏳ Waiting for demo user context to initialize...');
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        console.log('📊 Loading data for user:', currentDemoUser);
        const data = await getUserSkinStats(currentDemoUser);
        console.log('📊 Received data:', data);
        setSkinData(data.data || data);
      } catch (error) {
        console.error('Error loading skin data:', error);
        setError('Failed to load skin analysis data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [currentDemoUser]);

  // Re-sync currentDemoUser from localStorage on component mount and when returning from navigation
  const loadSkinData = async (userId = currentDemoUser) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserSkinStats(userId);
      setSkinData(data.data || data);
    } catch (error) {
      console.error('Error loading skin data:', error);
      setError('Failed to load skin analysis data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = async () => {
    console.log('🚀 Starting new AI analysis...');
    setShowAIAnalyzing(true);
    
    // Store previous data for comparison
    if (skinData) {
      localStorage.setItem('previousAnalysis', JSON.stringify(skinData));
    }
    
    // Let the AI animation run for 3 seconds, then complete
    setTimeout(() => {
      handleAIComplete();
    }, 3500);
  };

    const handleAIComplete = () => {
    console.log('🎯 AI analysis complete, generating goals...');
    setShowAIAnalyzing(false);
    
    // Generate realistic goals based on current skin data
    if (skinData?.areas) {
      const generatedGoals = {};
      Object.keys(skinData.areas).forEach(area => {
        const current = skinData.areas[area].currentScore || 50;
        const target = Math.max(5, Math.round(current * 0.75)); // 25% improvement goal
        generatedGoals[area] = {
          current,
          target,
          timeframe: '8-12 weeks',
          priority: current > 40 ? 'high' : 'medium'
        };
      });
      
      const goalsGeneratedAt = new Date().toISOString();
      
      // Save goals to sessionStorage for persistence
      saveUserGoals(currentDemoUser, generatedGoals, goalsGeneratedAt);
      
      // Update skin data with goals
      const updatedAreas = { ...skinData.areas };
      Object.keys(generatedGoals).forEach(areaId => {
        if (updatedAreas[areaId]) {
          updatedAreas[areaId] = {
            ...updatedAreas[areaId],
            goal: generatedGoals[areaId].target,
            goalData: generatedGoals[areaId]
          };
        }
      });
      
      const updatedSkinData = {
        ...skinData,
        areas: updatedAreas,
        goals: generatedGoals,
        aiGoalsGenerated: true,
        goalsGeneratedAt
      };
      
      setSkinData(updatedSkinData);
      
      // Show completion message
      setShowAnalysisComplete(true);
      setTimeout(() => {
        setShowAnalysisComplete(false);
      }, 2000);
    }
  };

  const handleCloseAnalysisComplete = () => {
    setShowAnalysisComplete(false);
  };

  const handleGetAIRecommendations = () => {
    setShowAIRecommendations(true);
  };


  const handleCloseResults = () => {
    setShowResultsModal(false);
    setAnalysisComparison(null);
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
          message="🔬 L'Oréal AI is analyzing your skin across all key concern areas. Calculating personalized improvement goals based on your unique skin profile and our advanced dermatological database..."
          isActive={true}
          type="analyzing"
          duration={3000}
          onComplete={handleAIComplete}
        />
      )}

      {showAnalysisComplete && (
        <div className="ai-analysis-overlay">
          <div className="analysis-complete-popup">
            <button className="close-btn" onClick={handleCloseAnalysisComplete} title="Close">
              <i className="fas fa-times"></i>
            </button>
            <div className="completion-content">
              <div className="completion-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Analysis Complete!</h3>
              <p>Your personalized recommendations are ready</p>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Your Skin Health Dashboard</h1>
            <p className="subtitle">
              Track your progress across key skin concern areas with AI-powered insights
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
                  <div className="advanced-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                  </div>
                  <span className="analyzing-text">
                    Analyzing...
                    <span className="analyzing-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span className="btn-icon">
                    <i className="fas fa-microscope"></i>
                  </span>
                  <span className="btn-text">Start New AI Analysis</span>
                  <div className="btn-particles">
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                  </div>
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

      {/* Analysis Results Comparison Modal */}
      {showResultsModal && analysisComparison && (
        <div className="modal-overlay" onClick={handleCloseResults}>
          <div className="results-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-chart-line"></i>
                Analysis Complete - Here's What Changed
              </h2>
              <button className="modal-close" onClick={handleCloseResults}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="results-summary">
                <div className="summary-stats">
                  <div className="stat-item improved">
                    <div className="stat-icon">
                      <i className="fas fa-arrow-up"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">
                        {analysisComparison.changes.filter(c => c.improved).length}
                      </span>
                      <span className="stat-label">Areas Improved</span>
                    </div>
                  </div>
                  
                  <div className="stat-item attention">
                    <div className="stat-icon">
                      <i className="fas fa-arrow-down"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">
                        {analysisComparison.changes.filter(c => !c.improved).length}
                      </span>
                      <span className="stat-label">Need Attention</span>
                    </div>
                  </div>
                  
                  <div className="stat-item total">
                    <div className="stat-icon">
                      <i className="fas fa-exchange-alt"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{analysisComparison.changes.length}</span>
                      <span className="stat-label">Total Changes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="changes-list">
                <h3>Detailed Changes</h3>
                {analysisComparison.changes.map((change, index) => (
                  <div key={index} className={`change-item ${change.improved ? 'improved' : 'declined'}`}>
                    <div className="change-icon">
                      <i className={`fas ${change.improved ? 'fa-arrow-down text-success' : 'fa-arrow-up text-warning'}`}></i>
                    </div>
                    <div className="change-info">
                      <h4>{change.area.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                      <div className="change-scores">
                        <span className="previous-score">Was: {change.previous}</span>
                        <span className="arrow">→</span>
                        <span className="current-score">Now: {change.current}</span>
                      </div>
                      <div className="change-amount">
                        {change.improved ? 'Improved' : 'Increased'} by {Math.abs(change.change)} points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="ai-insights">
                <h3>
                  <i className="fas fa-lightbulb"></i>
                  AI Insights
                </h3>
                <div className="insight-card">
                  <p>
                    {analysisComparison.changes.filter(c => c.improved).length > analysisComparison.changes.filter(c => !c.improved).length
                      ? "Great progress! Your skincare routine is working effectively. Continue with your current regimen."
                      : "Some areas need attention. Consider adjusting your routine or consulting with our AI recommendations."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseResults}>
                Got it!
              </button>
              <button className="btn-primary" onClick={handleGetAIRecommendations}>
                <i className="fas fa-robot"></i>
                Get AI Recommendations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
