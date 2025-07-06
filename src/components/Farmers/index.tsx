

import React, { useState } from 'react';
import "./Farmers.css";
import { soulResources } from '../../source1';

const SoulStation = () => {
  const [activeTab, setActiveTab] = useState('videos');

  const getStatusColor = (category) => {
    const colorMap = {
      'Meditation': 'var(--color-success)',
      'Movement': 'var(--color-warning)',
      'Education': 'var(--color-primary)',
      'Lifestyle': 'var(--color-success)',
      'Workplace': 'var(--color-warning)',
      'Self-Help': 'var(--color-success)',
      'Creative Therapy': 'var(--color-primary)',
      'Health': 'var(--color-warning)',
      'Relaxation': 'var(--color-success)'
    };
    return colorMap[category] || 'var(--color-primary)';
  };

  // Function to determine which columns to show based on active tab
  const getTableHeaders = () => {
    switch(activeTab) {
      case 'videos':
        return ['Name', 'Category', 'Duration', 'Rating'];
      case 'blogs':
        return ['Name', 'Category', 'Read Time', 'Author'];
      case 'books':
        return ['Name', 'Category', 'Author', 'Rating'];
      case 'podcasts':
        return ['Name', 'Category', 'Duration', 'Host'];
      default:
        return [];
    }
  };

  return (
    <div className='soul__station'>
      <h1>Soul Station</h1>

      {/* Tab Navigation */}
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

      <table>
        <thead>
          <tr>
            {getTableHeaders().map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {soulResources[activeTab].map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td className="status">
                <div 
                  className="dot"
                  style={{ backgroundColor: getStatusColor(item.category) }}
                />
                <small>{item.category}</small>
              </td>
              {/* Conditional rendering based on content type */}
              {activeTab === 'videos' && (
                <>
                  <td>{item.duration}</td>
                  <td>{item.rating}</td>
                </>
              )}
              {activeTab === 'blogs' && (
                <>
                  <td>{item.readTime}</td>
                  <td>{item.author}</td>
                </>
              )}
              {activeTab === 'books' && (
                <>
                  <td>{item.author}</td>
                  <td>{item.rating}</td>
                </>
              )}
              {activeTab === 'podcasts' && (
                <>
                  <td>{item.duration}</td>
                  <td>{item.host}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoulStation;