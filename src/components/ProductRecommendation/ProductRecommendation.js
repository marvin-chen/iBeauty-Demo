import React from 'react';
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
  if (!product) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className={`product-recommendation ${className}`}>
      <div className="product-header">
        <div className="product-image">
          <div className="product-icon-placeholder">
            <i className="fas fa-spa" style={{ fontSize: '1.8rem', color: '#D4AF37' }}></i>
          </div>
        </div>
        
        <div className="product-details">
          <h4 className="product-title">{product.name}</h4>
          <div className="product-price">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span className="current-price">${product.salePrice}</span>
                <span className="original-price">${product.price}</span>
              </>
            ) : (
              <span className="current-price">${product.price}</span>
            )}
          </div>
        </div>
        
        <div className="product-actions">
          <button 
            className="action-btn primary-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {reason && (
        <div className="recommendation-note">
          <span className="note-icon">💡</span>
          <p className="note-text">{reason}</p>
        </div>
      )}
    </div>
  );
}

export default ProductRecommendation;
