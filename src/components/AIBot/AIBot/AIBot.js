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

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      setCurrentMessage('');

      // Animate the dots
      const dotsInterval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);

      // Animate the message typing
      let currentIndex = 0;
      const messageInterval = setInterval(() => {
        if (currentIndex < message.length) {
          setCurrentMessage(message.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(messageInterval);
        }
      }, 50);

      // Auto-hide after duration
      const hideTimer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
        setIsVisible(false);
      }, duration);

      return () => {
        clearInterval(dotsInterval);
        clearInterval(messageInterval);
        clearTimeout(hideTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [isActive, message, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`ai-bot ${type}`}>
      <div className="ai-bot-container">
        <div className="ai-bot-avatar">
          <div className="ai-bot-face">
            <div className="ai-bot-eye left-eye">
              <div className="eye-pupil"></div>
            </div>
            <div className="ai-bot-eye right-eye">
              <div className="eye-pupil"></div>
            </div>
            <div className="ai-bot-mouth"></div>
          </div>
          <div className="ai-bot-pulse"></div>
          <div className="ai-bot-glow"></div>
          
          {/* Brain activity visualization */}
          <div className="ai-brain-activity">
            <div className="brain-wave wave-1"></div>
            <div className="brain-wave wave-2"></div>
            <div className="brain-wave wave-3"></div>
          </div>
        </div>

        <div className="ai-bot-message">
          <div className="message-bubble">
            <div className="message-text">
              {currentMessage}
              <span className="typing-cursor">|</span>
            </div>
            <div className="thinking-dots">
              <span className="dot dot-1">●</span>
              <span className="dot dot-2">●</span>
              <span className="dot dot-3">●</span>
            </div>
          </div>
          <div className="message-tail"></div>
        </div>

        {/* AI Processing visualization */}
        <div className="ai-processing">
          <div className="processing-bar">
            <div className="processing-fill"></div>
          </div>
          <div className="processing-text">
            AI Processing{dots}
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="ai-background-effects">
        <div className="floating-particle particle-1">✨</div>
        <div className="floating-particle particle-2">🧠</div>
        <div className="floating-particle particle-3">💡</div>
        <div className="floating-particle particle-4">📊</div>
        <div className="floating-particle particle-5">🔬</div>
      </div>
    </div>
  );
}

export default AIBot;
