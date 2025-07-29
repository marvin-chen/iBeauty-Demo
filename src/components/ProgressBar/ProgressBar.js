import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

function ProgressBar({ 
  value = 0, 
  max = 100, 
  color = 'var(--color-primary)', 
  backgroundColor = 'var(--color-light-gray)',
  height = '12px',
  borderRadius = 'var(--radius-full)',
  animated = false,
  showLabel = false,
  label = '',
  className = ''
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (animated) {
      // Animate the progress bar fill
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animated]);

  const percentage = Math.min(Math.max((animatedValue / max) * 100, 0), 100);
  
  const progressStyle = {
    '--progress-color': color,
    '--progress-bg': backgroundColor,
    '--progress-height': height,
    '--progress-radius': borderRadius,
    '--progress-percentage': `${percentage}%`
  };

  const getProgressCategory = () => {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'fair';
    return 'poor';
  };

  return (
    <div className={`progress-bar-container ${className}`}>
      {showLabel && (
        <div className="progress-label">
          <span className="label-text">{label}</span>
          <span className="label-value">{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div 
        className={`progress-bar ${animated ? 'progress-animated' : ''} progress-${getProgressCategory()}`}
        style={progressStyle}
        role="progressbar"
        aria-valuenow={animatedValue}
        aria-valuemin="0"
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        <div className="progress-fill">
          {animated && <div className="progress-shimmer"></div>}
        </div>
      </div>
      
      {percentage > 0 && (
        <div className="progress-indicators">
          {percentage >= 25 && <div className="indicator indicator-25"></div>}
          {percentage >= 50 && <div className="indicator indicator-50"></div>}
          {percentage >= 75 && <div className="indicator indicator-75"></div>}
          {percentage >= 100 && <div className="indicator indicator-100"></div>}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
