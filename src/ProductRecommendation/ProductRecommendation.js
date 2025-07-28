import React, { useState } from 'react';
import './ProductRecommendation.css';

function ProductRecommendation({ 
  product, 
  reason = '', 
  priority = 'medium',
  showDetails = false,
  hideActions = false,
  onAddToCart,
  onViewDetails,
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!product) return null;

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'var(--color-danger)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-success)';
      default: return 'var(--color-medium-gray)';
    }
  };

  const getPriorityLabel = () => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Recommended';
      case 'low': return 'Optional';
      default: return 'Suggested';
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div className={`product-recommendation ${className}`}>
      <div className="recommendation-header">
        <div className="product-image">
          <div className="product-icon-placeholder">
            <i className="fas fa-box" style={{ fontSize: '2rem', color: '#D4AF37' }}></i>
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h4 className="product-name">{product.name}</h4>
          <div className="product-price">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span className="sale-price">${product.salePrice}</span>
                <span className="original-price">${product.price}</span>
                <span className="discount">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="price">${product.price}</span>
            )}
          </div>
        </div>

        <div className="priority-badge" style={{ backgroundColor: getPriorityColor() + '20', color: getPriorityColor() }}>
          {getPriorityLabel()}
        </div>
      </div>

      {reason && (
        <div className="recommendation-reason">
          <div className="reason-icon">💡</div>
          <p className="reason-text">{reason}</p>
        </div>
      )}

      <div className="product-features">
        {product.keyBenefits && product.keyBenefits.slice(0, 3).map((benefit, index) => (
          <span key={index} className="feature-tag">
            {benefit}
          </span>
        ))}
      </div>

      {showDetails && (
        <div className={`product-details ${isExpanded ? 'expanded' : ''}`}>
          <button 
            className="details-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
            <span className={`toggle-arrow ${isExpanded ? 'rotated' : ''}`}>▼</span>
          </button>
          
          {isExpanded && (
            <div className="details-content">
              <div className="product-description">
                <h5>About This Product</h5>
                <p>{product.description}</p>
              </div>
              
              {product.ingredients && (
                <div className="product-ingredients">
                  <h5>Key Ingredients</h5>
                  <ul>
                    {product.ingredients.slice(0, 5).map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {product.howToUse && (
                <div className="product-usage">
                  <h5>How to Use</h5>
                  <p>{product.howToUse}</p>
                </div>
              )}
              
              {product.rating && (
                <div className="product-rating">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.rating}/5 ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!hideActions && (
        <div className="recommendation-actions">
          <button 
            className="btn-outline view-details-btn"
            onClick={handleViewDetails}
          >
            View Details
          </button>
          <button 
            className="btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
            <span className="cart-icon">🛒</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductRecommendation;
