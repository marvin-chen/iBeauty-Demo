import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ProductRecommendation from '../../components/ProductRecommendation/ProductRecommendation';
import AIBot from '../../components/AIBot/AIBot/AIBot';
import { getAreaById, calculateProgress, getScoreCategory, generateAIGoal } from '../../utils/skinAreas';
import { getUserSkinStats, getProductRecommendations } from '../../services/api';
import { formatScore, formatDate } from '../../utils/helpers';
import './AreaDetail.css';

function AreaDetail() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  
  const [areaData, setAreaData] = useState(null);
  const [skinData, setSkinData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [error, setError] = useState(null);

  const area = getAreaById(areaId);

  const loadAreaData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserSkinStats('user123');
      const fullData = data.data || data;
      setSkinData(fullData);
      setAreaData(fullData.areas?.[areaId]);
    } catch (error) {
      console.error('Error loading area data:', error);
      setError('Failed to load skin area data');
    } finally {
      setIsLoading(false);
    }
  }, [areaId]);

  const loadRecommendations = useCallback(async () => {
    try {
      const data = await getProductRecommendations(areaId, 'user123');
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Don't set error here, just log it
    }
  }, [areaId]);

  useEffect(() => {
    if (!area) {
      setError('Skin area not found');
      return;
    }
    
    loadAreaData();
    loadRecommendations();
  }, [area, loadAreaData, loadRecommendations]);

  const handleAIComplete = () => {
    setShowAI(false);
    // Simulate goal update
    if (areaData) {
      const newGoal = generateAIGoal(areaData.currentScore, area);
      setAreaData({
        ...areaData,
        goal: newGoal.goal,
        aiRecommendation: newGoal
      });
    }
  };

  if (error) {
    return (
      <div className="area-detail-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2>Area Not Found</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !area || !areaData) {
    return (
      <div className="area-detail-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading skin area analysis...</p>
        </div>
      </div>
    );
  }

  const currentScore = areaData.currentScore || 0;
  const goal = areaData.goal || 0;
  const previousScore = areaData.previousScore || currentScore;
  const progress = goal ? calculateProgress(currentScore, goal, previousScore) : 0;
  const scoreCategory = getScoreCategory(currentScore, area);
  const hasImprovement = previousScore > currentScore;
  const improvementAmount = Math.abs(previousScore - currentScore);

  return (
    <div className="area-detail">
      {showAI && (
        <AIBot 
          message={`Analyzing your ${area.name.toLowerCase()} and calculating the optimal next goal based on your skin profile...`}
          isActive={true}
          type="thinking"
          duration={3500}
          onComplete={handleAIComplete}
        />
      )}

      <div className="area-detail-header">
        <div className="header-container">
          <button className="back-button" onClick={() => navigate('/')}>
            <span className="back-arrow">←</span>
          </button>

          <div className="area-hero">
            <div className="area-icon-large" style={{ backgroundColor: area.color }}>
              <i className={area.icon}></i>
            </div>
            
            <div className="area-info">
              <h1>{area.name}</h1>
              <p className="area-description">{area.description}</p>
              <div className="area-category">
                <span className="category-tag" style={{ backgroundColor: area.color + '20', color: area.color }}>
                  {area.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="area-detail-content">
        <div className="main-content">
          {/* Current Status */}
          <div className="status-section">
            <h2>Current Status</h2>
            <div className="status-grid">
              <div className="score-card current">
                <div className="score-header">
                  <span className="score-label">Current Score</span>
                  <span className="score-trend">
                    {hasImprovement ? (
                      <span className="trend-positive">↓ -{formatScore(improvementAmount)}</span>
                    ) : (
                      <span className="trend-neutral">No change</span>
                    )}
                  </span>
                </div>
                <div className="score-value" style={{ color: area.color }}>
                  {formatScore(currentScore)}
                </div>
                <div className={`score-category category-${scoreCategory}`}>
                  {scoreCategory.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              {goal > 0 && (
                <div className="score-card goal">
                  <div className="score-header">
                    <span className="score-label">Target Goal</span>
                  </div>
                  <div className="score-value">
                    {formatScore(goal)}
                  </div>
                  <div className="score-description">
                    Next milestone
                  </div>
                </div>
              )}

              <div className="score-card optimal">
                <div className="score-header">
                  <span className="score-label">Optimal Range</span>
                </div>
                <div className="score-value text-success">
                  {area.optimalRange.min}-{area.optimalRange.max}
                </div>
                <div className="score-description">
                  Healthy level
                </div>
              </div>
            </div>

            {goal > 0 && (
              <div className="progress-section">
                <div className="progress-header">
                  <h3>Progress to Goal</h3>
                  <span className="progress-percentage">{Math.round(progress)}% Complete</span>
                </div>
                <ProgressBar 
                  value={progress}
                  color={area.color}
                  height="16px"
                  animated={true}
                  showLabel={false}
                />
                <div className="progress-description">
                  {progress >= 100 ? 'Goal achieved! 🎉' : 'Keep up the great work!'}
                </div>
              </div>
            )}
          </div>

          {/* AI Goals Section */}
          <div className="goals-section">
            <div className="section-header">
              <h2>AI Analysis</h2>
            </div>

            {areaData.aiRecommendation && (
              <div className="ai-recommendation">
                <div className="ai-header">
                  <span className="ai-icon">🧠</span>
                  <span>AI Recommendation</span>
                </div>
                <p>{areaData.aiRecommendation.reasoning}</p>
                <div className="ai-stats">
                  <span>Confidence: {Math.round(areaData.aiRecommendation.confidence * 100)}%</span>
                  <span>Timeframe: {areaData.aiRecommendation.timeframe}</span>
                </div>
              </div>
            )}

            {!areaData.aiRecommendation && (
              <div className="no-ai-recommendation">
                <p>Complete a full skin analysis to receive personalized AI recommendations for this area.</p>
              </div>
            )}
          </div>

          {/* Product Recommendations */}
          {products.length > 0 && (
            <div className="recommendations-section">
              <h2>Personalized Product Recommendations</h2>
              <div className="recommendations-grid">
                {products.slice(0, 3).map((product, index) => (
                  <ProductRecommendation
                    key={product.id || index}
                    product={product}
                    reason={product.recommendation_reason}
                    priority={product.priority || 'medium'}
                    showDetails={true}
                    hideActions={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="tips-card">
            <h3>Care Tips</h3>
            <ul>
              <li>Follow a consistent daily routine</li>
              <li>Use products with gentle, effective ingredients</li>
              <li>Monitor changes over time</li>
              <li>Stay consistent with your regimen</li>
            </ul>
          </div>

          <div className="history-card">
            <h3>Analysis History</h3>
            <div className="history-item">
              <span className="history-date">
                {skinData.lastUpdated ? formatDate(skinData.lastUpdated) : 'Today'}
              </span>
              <span className="history-score">{formatScore(currentScore)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaDetail;
