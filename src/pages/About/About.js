import React from 'react';
import { SKIN_AREAS } from '../../utils/skinAreas';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About iBeauty</h1>
          <p className="hero-subtitle">
            Your personalized AI-powered skin health companion powered by L'Oréal expertise
          </p>
        </div>
      </div>

      <div className="about-content">
        {/* What is iBeauty */}
        <section className="about-section">
          <h2>What is iBeauty?</h2>
          <div className="section-content">
            <p>
              iBeauty is an advanced AI-driven skin analysis platform that combines L'Oréal's decades 
              of cosmetic expertise with cutting-edge artificial intelligence to provide personalized 
              skincare recommendations. Our platform analyzes your skin's unique characteristics and 
              provides targeted advice to help you achieve your skincare goals.
            </p>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>AI-Powered Analysis</h4>
                <p>Advanced algorithms analyze your skin across 8 key areas</p>
              </div>
              <div className="feature-card">
                <h4>Personalized Recommendations</h4>
                <p>Tailored skincare routines based on your unique skin profile</p>
              </div>
              <div className="feature-card">
                <h4>L'Oréal Expertise</h4>
                <p>Backed by decades of cosmetic research and innovation</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="about-section">
          <h2>How to Use iBeauty</h2>
          <div className="section-content">
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Use DermaReader Photos</h4>
                <p>Auto-connect with the DermaReader device for seamless skin analysis</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h4>AI Analysis</h4>
                <p>Our AI analyzes your skin across 8 key areas and generates detailed scores</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Get Recommendations</h4>
                <p>Receive personalized skincare routines and product suggestions</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <h4>Track Progress</h4>
                <p>Monitor improvements and adjust your routine based on ongoing analysis</p>
              </div>
            </div>
          </div>
        </section>

        {/* The 8 Skin Areas */}
        <section className="about-section">
          <h2>The 8 Skin Analysis Areas</h2>
          <div className="section-content">
            <p className="section-intro">
              Our comprehensive skin analysis evaluates your skin across 8 critical areas, 
              each providing valuable insights into your skin's health and appearance.
            </p>
            <div className="areas-grid">
              {SKIN_AREAS.map((area) => (
                <div key={area.id} className="area-info-card">
                  <div className="area-header-section">
                    <div className="area-icon-wrapper" style={{ backgroundColor: area.color }}>
                      <i className={area.icon}></i>
                    </div>
                    <div className="area-title-section">
                      <h4>{area.name}</h4>
                      <div className="area-category">{area.category}</div>
                    </div>
                  </div>
                  <div className="area-content-section">
                    <p className="area-description">{area.description}</p>
                    <div className="measurement-info">
                      <div className="measurement-label">
                        Measured by: <span className="measurement-value">{area.measurementUnit}</span>
                      </div>
                      <div className="optimal-range">
                        Optimal range: <span className="range-value">{area.optimalRange.min}-{area.optimalRange.max}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Understanding Your Scores */}
        <section className="about-section">
          <h2>Understanding Your Scores</h2>
          <div className="section-content">
            <p className="section-intro">
              Each skin area receives a numerical score that indicates the current condition. 
              Lower scores generally indicate better skin health in that area.
            </p>
            <div className="score-guide">
              <div className="score-range excellent">
                <div className="score-indicator"></div>
                <div className="score-info">
                  <h4>Excellent (0-20)</h4>
                  <p>Your skin is in optimal condition in this area. Maintain your current routine.</p>
                </div>
              </div>
              <div className="score-range good">
                <div className="score-indicator"></div>
                <div className="score-info">
                  <h4>Good (21-40)</h4>
                  <p>Your skin is performing well with minor areas for improvement.</p>
                </div>
              </div>
              <div className="score-range fair">
                <div className="score-indicator"></div>
                <div className="score-info">
                  <h4>Fair (41-60)</h4>
                  <p>Some concerns are present. Consider targeted treatments.</p>
                </div>
              </div>
              <div className="score-range needs-improvement">
                <div className="score-indicator"></div>
                <div className="score-info">
                  <h4>Needs Attention (61+)</h4>
                  <p>This area requires focused care and specialized products.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="about-section">
          <h2>AI Recommendations Explained</h2>
          <div className="section-content">
            <div className="recommendation-types">
              <div className="rec-type-card">
                <h4>Personalized Insights</h4>
                <p>
                  Based on your skin analysis, our AI identifies your skin's strongest areas 
                  and areas that need attention, providing actionable insights for improvement.
                </p>
              </div>
              <div className="rec-type-card">
                <h4>Morning & Evening Routines</h4>
                <p>
                  Customized skincare routines that fit your lifestyle, with specific product 
                  recommendations and application order for optimal results.
                </p>
              </div>
              <div className="rec-type-card">
                <h4>Targeted Treatments</h4>
                <p>
                  Specific recommendations for each skin concern, including ingredient suggestions 
                  and expected timeframes for visible improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="about-section">
          <h2>Privacy & Security</h2>
          <div className="section-content">
            <div className="privacy-info">
              <div className="privacy-point">
                <h4>Secure Analysis</h4>
                <p>All skin analysis is performed securely with enterprise-grade encryption</p>
              </div>
              <div className="privacy-point">
                <h4>Data Protection</h4>
                <p>Your personal data and images are protected and never shared with third parties</p>
              </div>
              <div className="privacy-point">
                <h4>Local Processing</h4>
                <p>Image analysis is performed locally when possible to ensure maximum privacy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="about-section">
          <h2>Need Help?</h2>
          <div className="section-content">
            <p>
              If you have questions about using iBeauty or interpreting your results, 
              our support team is here to help. For best results, we recommend:
            </p>
            <ul className="help-list">
              <li>Taking photos in consistent lighting conditions</li>
              <li>Following the recommended analysis frequency (weekly to monthly)</li>
              <li>Being consistent with your skincare routine</li>
              <li>Consulting with a dermatologist for persistent skin concerns</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
