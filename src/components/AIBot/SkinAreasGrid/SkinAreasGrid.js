import React from 'react';
import { Link } from 'react-router-dom';
import SkinAreaCard from '../../SkinAreaCard/SkinAreaCard';
import { SKIN_AREAS } from '../../../utils/skinAreas';
import './SkinAreasGrid.css';

function SkinAreasGrid({ skinData, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="skin-areas-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="skin-area-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content"></div>
            <div className="skeleton-footer"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!skinData?.areas) {
    return (
      <div className="skin-areas-empty">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No Skin Analysis Data</h3>
          <p>Start your first skin analysis to see your personalized dashboard.</p>
          <button className="btn-primary">Start Analysis</button>
        </div>
      </div>
    );
  }

  return (
    <div className="skin-areas-grid">
      {SKIN_AREAS.map((area) => {
        const areaData = skinData.areas[area.id];
        
        return (
          <Link 
            key={area.id} 
            to={`/area/${area.id}`} 
            className="skin-area-link"
          >
            <SkinAreaCard
              area={area}
              data={areaData}
              showProgress={true}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default SkinAreasGrid;
