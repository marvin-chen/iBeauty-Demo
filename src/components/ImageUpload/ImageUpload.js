import React, { useState, useRef } from 'react';
import './ImageUpload.css';

function ImageUpload({ onImageAnalyzed, isAnalyzing }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload for analysis
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/analyze-skin', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      onImageAnalyzed(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  return (
    <div className="image-upload">
      <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
        {preview ? (
          <img src={preview} alt="Skin preview" className="preview-image" />
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📸</div>
            <h3>Take or Upload Skin Photo</h3>
            <p>Get AI-powered skin analysis</p>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleImageSelect}
        style={{ display: 'none' }}
      />
      
      {isAnalyzing && (
        <div className="analyzing-overlay">
          <div className="spinner"></div>
          <p>Analyzing your skin...</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
