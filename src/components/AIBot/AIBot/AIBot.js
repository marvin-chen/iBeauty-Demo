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
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      setCurrentMessage('');
      setShowCompleted(false);

      // Animate the dots
      const dotsInterval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);

      // Animate the message typing (slower for readability with natural pauses)
      let currentIndex = 0;
      const typeNextCharacter = () => {
        if (currentIndex < message.length) {
          setCurrentMessage(message.substring(0, currentIndex + 1));
          currentIndex++;
          
          // Longer pause after spaces, periods, and ellipsis for natural reading rhythm
          const currentChar = message[currentIndex - 1];
          let delay = 70; // Base typing speed
          
          if (currentChar === ' ') delay = 150;
          else if (currentChar === '.' || currentChar === '…') delay = 300;
          else if (currentChar === ',') delay = 200;
          
          setTimeout(typeNextCharacter, delay);
        }
      };
      
      typeNextCharacter();

      // Show completed state before hiding
      const completedTimer = setTimeout(() => {
        setShowCompleted(true);
        clearInterval(dotsInterval);
        
        // Hide after showing completed for 1 second
        const hideTimer = setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
          setIsVisible(false);
          setShowCompleted(false);
        }, 1000);

        return () => clearTimeout(hideTimer);
      }, duration - 1000);

      return () => {
        clearInterval(dotsInterval);
        clearTimeout(completedTimer);
      };
    } else {
      setIsVisible(false);
      setShowCompleted(false);
    }
  }, [isActive, message, duration, onComplete]);

  if (!isVisible) return null;

  if (showCompleted) {
    return (
      <div className="ai-bot completed">
        <div className="completion-container">
          <div className="completion-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="completion-message">
            <h3>Analysis Complete!</h3>
            <p>Your personalized recommendations are ready</p>
          </div>
        </div>
      </div>
    );
  }

  return (
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
              {currentMessage}
              <span className="typing-cursor">|</span>
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
  );
}

export default AIBot;
