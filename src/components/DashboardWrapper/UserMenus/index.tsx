import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import "./UserMenus.css";
import { userMenus } from '../../../source1';
import ClickAwayListener from 'react-click-away-listener';

const UserMenus = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);

  // Wellness messages array
  const wellnessMessages = [
    {
      title: "Hydration Reminder",
      message: "Remember to drink water and stay hydrated throughout the day! 💧",
      type: "hydration"
    },
    {
      title: "Healthy Eating",
      message: "Take a moment to enjoy some fresh fruits today! 🍎🍌",
      type: "nutrition"
    },
    {
      title: "Meditation Time",
      message: "Have you done your Shambhavi meditation today? Find your inner peace 🧘‍♂️",
      type: "meditation"
    },
    {
      title: "Spiritual Practice",
      message: "Try Krishna Jaap today to elevate your consciousness 🕉️",
      type: "spiritual"
    }
  ];

  useEffect(() => {
    const today = new Date();
    setCurrentDay(today.getDay());
  }, []);

  const getTodayMessages = () => {
    const baseMessage = wellnessMessages[currentDay % wellnessMessages.length];
    const hydrationMessage = wellnessMessages[0];
    return [baseMessage, hydrationMessage];
  };

  const getMessageColor = (type) => {
    const colors = {
      hydration: "text-blue-600",
      nutrition: "text-green-600",
      meditation: "text-purple-600",
      spiritual: "text-yellow-600"
    };
    return colors[type] || "text-gray-600";
  };

  const handleClickAway = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative">
        {/* Bell Icon Button */}
        <button 
          onClick={() => {
            setIsOpen(!isOpen);
            console.log('isOpen:', !isOpen);
        }}
          
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Combined Dropdown Content */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
            {/* Wellness Messages Section */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-4">Today's Wellness Reminders</h3>
              <div className="space-y-4">
                {getTodayMessages().map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className={`font-medium ${getMessageColor(item.type)}`}>
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Original User Menus Section */}
            <ul className="user__menus p-2">
              {userMenus.map((menu, index) => (
                <li className="menu p-2 hover:bg-gray-100 rounded-lg transition-colors" key={index}>
                  {menu.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default UserMenus;