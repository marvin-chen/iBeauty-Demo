import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { calculateProgress, getScoreCategory } from '../utils/skinAreas';
import { formatScore } from '../utils/helpers';
import './SkinAreaCard.css';

function SkinAreaCard({ area, data, showProgress = false, className = '' }) {
  if (!area) return null;

  const currentScore = data?.currentScore ?? 0;
  const goal = data?.goal ?? 0;
  const previousScore = data?.previousScore ?? currentScore;
  
  const progress = showProgress && goal ? calculateProgress(currentScore, goal, previousScore) : 0;
  const scoreCategory = getScoreCategory(currentScore, area);
  const hasImprovement = previousScore > currentScore;
  const improvementAmount = Math.abs(previousScore - currentScore);

  const getScoreColor = () => {
    switch (scoreCategory) {
      case 'excellent': return 'var(--color-success)';
      case 'good': return 'var(--color-primary)';
      case 'fair': return 'var(--color-warning)';
      case 'needs-improvement': return 'var(--color-danger)';
      default: return 'var(--color-medium-gray)';
    }
  };

  const getCategoryLabel = () => {
    switch (scoreCategory) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'fair': return 'Fair';
      case 'needs-improvement': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`skin-area-card ${className}`} style={{ '--area-color': area.color }}>
      <div className="card-header">
        <div className="area-info">
          <div className="area-icon" style={{ backgroundColor: area.color }}>
            <i className={area.icon}></i>
          </div>
          <div className="area-details">
            <h3 className="area-name">{area.name}</h3>
            <p className="area-description">{area.description}</p>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="score-section">
          <div className="current-score">
            <span className="score-label">Current Score</span>
            <span className="score-value" style={{ color: getScoreColor() }}>
              {formatScore(currentScore)}
            </span>
          </div>
          
          {goal > 0 && (
            <div className="goal-score">
              <span className="goal-label">Goal</span>
              <span className="goal-value">{formatScore(goal)}</span>
            </div>
          )}
        </div>

        <div className="score-category">
          <span 
            className={`category-badge category-${scoreCategory}`}
            style={{ backgroundColor: getScoreColor() + '20', color: getScoreColor() }}
          >
            {getCategoryLabel()}
          </span>
        </div>

        {showProgress && goal > 0 && (
          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">Progress to Goal</span>
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
            <ProgressBar 
              value={progress} 
              color={area.color}
              height="8px"
              animated={progress > 0}
            />
          </div>
        )}

        {hasImprovement && improvementAmount > 0 && (
          <div className="improvement-indicator">
            <span className="improvement-icon">📈</span>
            <span className="improvement-text">
              Improved by {formatScore(improvementAmount)} points
            </span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className="view-details-btn">
          View Details
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

export default SkinAreaCard;
