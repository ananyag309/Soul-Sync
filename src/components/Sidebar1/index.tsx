import React, { useEffect } from 'react';
import './Sidebar.css';

import { FaTimes } from 'react-icons/fa';
import { sidebar } from '../../source1';
import { profile6, profile7 } from '../../assets/images';
import { FaSquarePen } from 'react-icons/fa6';
import { Tractor } from 'lucide-react';
import {BrainCircuit} from 'lucide-react'

interface SidebarProps {
  show: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, onClose }) => {
  useEffect(() => {
    // Ensure the Google Translate script is added only once
    const existingScript = document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/popup.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.gtranslate.net/widgets/latest/popup.js';
      script.defer = true;
      document.body.appendChild(script);

      // Set Google Translate settings
      window.gtranslateSettings = {
        default_language: 'en',
        detect_browser_language: true,
        wrapper_selector: '.gtranslate_wrapper',
        flag_size: 16,
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      {show && <div className="sidebar__overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${show ? 'show' : ''}`}>
        <div className="top">
          <div className="logo__container">
            <BrainCircuit className="icon" />
            <span>
              Soul<span className="text-primary">Sync</span>
            </span>
          </div>
          <div className="icon__container cancel__btn" onClick={onClose}>
            <FaTimes />
          </div>
        </div>
        <div className="middle">
          <button className="btn btn__primary">
            <FaSquarePen />
            <span> New Message </span>
          </button>
          <div className="tabs__container">
            {sidebar.map((list, index) => (
              <h3
                className={`tab ${list.route === '/' ? 'active' : ''}`}
                key={index}
              >
                {list.icon}
                <span className="name">{list.name}</span>
                {list.notificationCount && (
                  <div className="count">{list.notificationCount}</div>
                )}
              </h3>
            ))}
          </div>
          <h4 className="text__muted">Your Pyscologist Consultant</h4>
          <div className="chat__container">
            <div className="chat">
              <div className="profile">
                <img src={profile6} alt="Radhika Vasani" />
              </div>
              <div className="detail">
                <h4>Radhika Vasani</h4>
                <small className="text__muted">
                It's okay to feel overwhelmed sometimes. 
                </small>
              </div>
              <div className="dot status"></div>
            </div>
            <div className="chat">
              <div className="profile">
                <img src={profile7} alt="Ravi Mehta" />
              </div>
              <div className="detail">
                <h4>Ravi Mehta</h4>
                <small className="text__muted">
                Let's talk about what's been on your mind and work together to find ways to help you feel better
                </small>
              </div>
              <div className="dot status"></div>
            </div>
          </div>

          {/* Google Translate Widget */}
          <div className="translator">
            <div className="gtranslate_wrapper"></div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;