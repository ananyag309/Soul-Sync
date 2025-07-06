


import React, { useState } from 'react';
import "./SoulStation.css";
import { soulResources } from '../../source1';
import chroma from 'chroma-js';

const SoulStation = () => {
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div className='soul__station'>
      <h1>Activity Log</h1>
      
      {/* Navigation Tabs */}
      <div className="tabs__container">
        {Object.keys(soulResources).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab__button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="resources">
        {soulResources[activeTab].map((item, index) => (
          <div className="resource__card" key={index}>
            {/* Title */}
            <h3 className="clamp">{item.name}</h3>
            
            {/* Category */}
            <small 
              className="category"
              style={{
                background: chroma.random().alpha(0.1).css(),
                color: chroma.random(),
              }}
            >
              {item.category}
            </small>

            {/* Rating (if available) */}
            {item.rating && (
              <small className="rating">Rating: {item.rating}</small>
            )}

            {/* Other Details */}
            {item.duration && <small>Duration: {item.duration}</small>}
            {item.readTime && <small>Read time: {item.readTime}</small>}
            {item.author && <small>By: {item.author}</small>}
            {item.host && <small>Host: {item.host}</small>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoulStation;

