import React, { useState, useEffect } from 'react';
import './AIBot.css';

function AIBot({ 
  message = "Analyzing your skin and setting personalized goals...", 
  isActive = false,
  type = 'analyzing', // 'analyzing', 'success', 'thinking'
  duration = 3000,
  onComplete
}) {
  const [dots, setDots] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('🤖 AIBot useEffect - isActive:', isActive, 'type:', type);
    if (isActive) {
      setIsVisible(true);

      // Animate the dots
      const dotsInterval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);

      // Complete analysis after duration
      const completedTimer = setTimeout(() => {
        clearInterval(dotsInterval);
        setIsVisible(false);
        // Call onComplete when analysis finishes
        if (onComplete) {
          onComplete();
        }
      }, duration);

      return () => {
        clearInterval(dotsInterval);
        clearTimeout(completedTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [isActive, message, duration, onComplete, type]);

  if (!isVisible) return null;

  console.log('🤖 AIBot Rendering - isVisible:', isVisible, 'type:', type);

  return (
    <>
      {/* Blocking Overlay */}
      <div className="ai-analysis-overlay" onClick={(e) => e.stopPropagation()}>
        <div className={`ai-bot ${type}`}>
          <div className="ai-bot-container">
            {/* Flowing Animation Center */}
            <div className="flow-animation">
              <div className="flow-circle circle-1"></div>
              <div className="flow-circle circle-2"></div>
              <div className="flow-circle circle-3"></div>
              <div className="flow-circle circle-4"></div>
              <div className="flow-circle circle-5"></div>
              
              {/* Central L'Oréal Logo */}
              <div className="loreal-badge">
                <span>L'ORÉAL</span>
                <div className="ai-text">AI</div>
              </div>
            </div>

            <div className="ai-bot-message">
              <div className="message-bubble">
                <div className="message-text">
                  {message}
                </div>
              </div>
              <div className="message-tail"></div>
            </div>

            {/* Progress Flow */}
            <div className="progress-flow">
              <div className="flow-line">
                <div className="flow-particle particle-1"></div>
                <div className="flow-particle particle-2"></div>
                <div className="flow-particle particle-3"></div>
              </div>
              <div className="processing-text">
                AI Processing{dots}
              </div>
            </div>
          </div>

          {/* Floating Data Points */}
          <div className="ai-background-effects">
            <div className="floating-data-point point-1">
              <i className="fas fa-microscope"></i>
            </div>
            <div className="floating-data-point point-2">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="floating-data-point point-3">
              <i className="fas fa-atom"></i>
            </div>
            <div className="floating-data-point point-4">
              <i className="fas fa-dna"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AIBot;
