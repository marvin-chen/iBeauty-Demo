// src/components/AIRecommendations/AIRecommendations.js
import React, { useState, useEffect, useCallback } from 'react';
import { getAIRecommendations } from '../../services/api';
import { SKIN_AREAS } from '../../utils/skinAreas';
import './AIRecommendations.css';

function AIRecommendations({ skinData, className = '' }) {
  console.log('🎯 AIRecommendations component mounted with skinData:', !!skinData);
  console.log('🎯 AIRecommendations className:', className);
  
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadRecommendations = useCallback(async () => {
    try {
      console.log('🔄 loadRecommendations starting with skinData:', !!skinData);
      setIsLoading(true);
      setError(null);
      const response = await getAIRecommendations(skinData);
      console.log('✅ getAIRecommendations response:', response);
      
      // Process the response to get the right data structure
      const rawRecommendations = response.recommendations || response.data || response;
      console.log('📊 Raw recommendations:', rawRecommendations);
      
      if (Array.isArray(rawRecommendations)) {
        // Convert array to object format expected by component
        const processedData = {
          recommendations: {},
          confidence: 0.95,
          consolidatedRoutine: {
            morning: ["cleanse", "serum", "moisturizer", "spf"],
            evening: ["cleanse", "treatment", "moisturizer", "night_cream"]
          }
        };
        
        // Convert array to object with area as key
        rawRecommendations.forEach(rec => {
          if (rec.area) {
            processedData.recommendations[rec.area] = rec;
          }
        });
        
        console.log('🔄 Processed recommendations:', processedData);
        setRecommendations(processedData);
      } else {
        // Already in object format
        setRecommendations(rawRecommendations);
      }
    } catch (err) {
      console.error('❌ Failed to load AI recommendations:', err);
      setError('Failed to load personalized recommendations');
    } finally {
      setIsLoading(false);
    }
  }, [skinData]);

  useEffect(() => {
    if (skinData?.areas) {
      loadRecommendations();
    }
  }, [skinData, loadRecommendations]);

  const handleAreaClick = (area, rec) => {
    console.log('🖱️ Area clicked:', area, rec);
    setSelectedArea({ area, rec });
    setShowModal(true);
    console.log('🖱️ Modal state set - showModal: true, selectedArea:', { area, rec });
  };

  const closeModal = () => {
    console.log('❌ Closing modal');
    setShowModal(false);
    setSelectedArea(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'significant': return '#F44336';
      case 'severe': return '#B71C1C';
      default: return '#757575';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'positive': return <i className="fas fa-star" />;
      case 'warning': return <i className="fas fa-exclamation-triangle" />;
      case 'tip': return <i className="fas fa-lightbulb" />;
      case 'actionable': return <i className="fas fa-target" />;
      default: return <i className="fas fa-info-circle" />;
    }
  };

  const getAreaDisplayName = (areaId) => {
    const area = SKIN_AREAS.find(a => a.id === areaId);
    return area ? area.name : areaId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className={`ai-recommendations loading ${className}`}>
        <div className="ai-thinking">
          <div className="ai-brain">
            <i className="fas fa-brain fa-3x"></i>
          </div>
          <p>AI is analyzing your skin and generating personalized recommendations...</p>
          <div className="thinking-dots">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`ai-recommendations error ${className}`}>
        <div className="error-content">
          <span className="error-icon">
            <i className="fas fa-robot fa-2x"></i>
          </span>
          <p>{error}</p>
          <button onClick={loadRecommendations} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    console.log('🚨 AIRecommendations returning null - no recommendations data');
    console.log('🚨 isLoading:', isLoading, 'error:', error, 'recommendations:', recommendations);
    return null;
  }

  return (
    <div className={`ai-recommendations ${className}`}>
      {/* DEBUG: Highly visible element to confirm component is rendering */}
      <div style={{
        position: 'fixed',
        top: '50px',
        right: '20px',
        background: 'red',
        color: 'white',
        padding: '20px',
        zIndex: 9999,
        fontSize: '16px',
        fontWeight: 'bold',
        border: '3px solid yellow'
      }}>
        🎯 AIRecommendations Component IS RENDERING!
        <br/>
        Recommendations: {recommendations ? 'YES' : 'NO'}
        <br/>
        Loading: {isLoading ? 'YES' : 'NO'}
        <br/>
        Error: {error ? 'YES' : 'NO'}
      </div>
      
      <div className="ai-header">
        <h3>
          <span className="ai-icon">
            <i className="fas fa-microscope"></i>
          </span>
          AI-Powered Skincare Analysis
        </h3>
        <div className="confidence-badge">
          <i className="fas fa-chart-line"></i>
          {Math.round(recommendations.confidence * 100)}% Confidence
        </div>
      </div>

      {/* AI Insights */}
      {recommendations.insights && (
        <div className="ai-insights">
          <h4>Key Insights</h4>
          <div className="insights-grid">
            {recommendations.insights.map((insight, index) => (
              <div key={index} className={`insight-card ${insight.type}`}>
                <div className="insight-icon">
                  {insight.icon || getInsightIcon(insight.type)}
                </div>
                <div className="insight-content">
                  <h5>{insight.title}</h5>
                  <p>{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consolidated Routine */}
      {recommendations.consolidatedRoutine && (
        <div className="routine-section">
          <h4>Your Personalized Routine</h4>
          <div className="routine-grid">
            <div className="routine-card morning">
              <h5>
                <i className="fas fa-sun"></i>
                Morning Routine
              </h5>
              <ol>
                {recommendations.consolidatedRoutine.morning.map((step, index) => (
                  <li key={index}>{step.replace(/_/g, ' ')}</li>
                ))}
              </ol>
            </div>
            <div className="routine-card evening">
              <h5>
                <i className="fas fa-moon"></i>
                Evening Routine
              </h5>
              <ol>
                {recommendations.consolidatedRoutine.evening.map((step, index) => (
                  <li key={index}>{step.replace(/_/g, ' ')}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Area-Specific Recommendations */}
      <div className="area-recommendations">
        <h4>Area-Specific Guidance</h4>
        
        <div className="areas-grid">
          {console.log('🏷️ Rendering areas from recommendations.recommendations:', Object.keys(recommendations.recommendations || {}))}
          {recommendations && Object.entries(recommendations.recommendations).map(([area, rec]) => {
            console.log('🏷️ Processing area:', area, 'with rec:', rec);
            if (!rec || !rec.severity || !rec.priority) {
              console.warn(`Invalid recommendation data for area: ${area}`, rec);
              return null;
            }
            
            return (
              <div key={`area-${area}`} className="area-rec-card">
                <div 
                  className="area-header"
                  onClick={() => handleAreaClick(area, rec)}
                >
                  <h5>{getAreaDisplayName(area)}</h5>
                  <div className="area-meta">
                    <span 
                      className="severity-badge"
                      style={{ backgroundColor: getSeverityColor(rec.severity) }}
                    >
                      {rec.severity}
                    </span>
                    <span className="expand-icon">
                      <i className="fas fa-external-link-alt"></i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for detailed view */}
      {console.log('🔍 Modal render check - showModal:', showModal, 'selectedArea:', selectedArea)}
      {showModal && selectedArea && (
        <div className="area-details-modal" onClick={closeModal}>
          {/* DEBUG: Highly visible modal indicator */}
          <div style={{
            position: 'fixed',
            top: '100px',
            left: '20px',
            background: 'blue',
            color: 'white',
            padding: '15px',
            zIndex: 99999,
            fontSize: '14px',
            fontWeight: 'bold',
            border: '3px solid cyan'
          }}>
            🔵 MODAL IS RENDERING!<br/>
            Area: {selectedArea.area}<br/>
            ShowModal: {showModal ? 'TRUE' : 'FALSE'}
          </div>
          
          <div className="area-details-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header">
              <h4>{getAreaDisplayName(selectedArea.area)}</h4>
            </div>

            <div className="modal-content">
              <div className="severity-section">
                <span 
                  className="severity-badge"
                  style={{ backgroundColor: getSeverityColor(selectedArea.rec.severity) }}
                >
                  {selectedArea.rec.severity}
                </span>
              </div>
              
              <div className="detail-section">
                <h6>
                  <i className="fas fa-flask"></i>
                  Key Ingredients
                </h6>
                <div className="ingredients-list">
                  {selectedArea.rec.primaryIngredients && selectedArea.rec.primaryIngredients.map((ingredient, index) => (
                    <span key={`${selectedArea.area}-ingredient-${index}`} className="ingredient-tag">
                      {ingredient.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h6>
                  <i className="fas fa-route"></i>
                  Recommended Routine
                </h6>
                {selectedArea.rec.routine && typeof selectedArea.rec.routine === 'object' ? (
                  <div className="routine-breakdown">
                    {selectedArea.rec.routine.morning && (
                      <div className="routine-time">
                        <strong>Morning:</strong>
                        <ol>
                          {selectedArea.rec.routine.morning.map((step, index) => (
                            <li key={`${selectedArea.area}-morning-${index}`}>
                              {step.replace(/_/g, ' ')}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {selectedArea.rec.routine.evening && (
                      <div className="routine-time">
                        <strong>Evening:</strong>
                        <ol>
                          {selectedArea.rec.routine.evening.map((step, index) => (
                            <li key={`${selectedArea.area}-evening-${index}`}>
                              {step.replace(/_/g, ' ')}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ) : selectedArea.rec.routine && Array.isArray(selectedArea.rec.routine) ? (
                  <ol>
                    {selectedArea.rec.routine.map((step, index) => (
                      <li key={`${selectedArea.area}-routine-${index}`}>
                        {step.replace(/_/g, ' ')}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No routine information available</p>
                )}
              </div>

              <div className="detail-section">
                <h6>
                  <i className="fas fa-lightbulb"></i>
                  Expert Tips
                </h6>
                <ul>
                  {selectedArea.rec.tips && selectedArea.rec.tips.map((tip, index) => (
                    <li key={`${selectedArea.area}-tip-${index}`}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="timeframe">
                <strong>Expected results:</strong> {selectedArea.rec.timeframe}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="ai-footer">
        <p className="disclaimer">
          <i className="fas fa-user-md"></i>
          Professional analysis powered by AI. Consult a dermatologist for persistent concerns.
        </p>
        <button onClick={loadRecommendations} className="refresh-btn">
          <i className="fas fa-sync-alt"></i>
          Refresh Analysis
        </button>
      </div>
    </div>
  );
}

export default AIRecommendations;
