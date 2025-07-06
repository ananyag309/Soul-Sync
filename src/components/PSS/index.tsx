// PSS_Check.jsx
import React, { useEffect, useState } from 'react';
import './PSS.css';
import { useUser } from '@clerk/clerk-react';

const PSS_Check = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "In the last month, how often have you been upset because of something that happened unexpectedly?",
      type: "normal"
    },
    {
      id: 2,
      text: "In the last month, how often have you felt unable to control the important things in your life?",
      type: "normal"
    },
    {
      id: 3,
      text: "In the last month, how often have you felt nervous and stressed?",
      type: "normal"
    },
    {
      id: 4,
      text: "In the last month, how often have you felt confident about your ability to handle personal problems?",
      type: "reverse"
    },
    {
      id: 5,
      text: "In the last month, how often have you felt that things were going your way?",
      type: "reverse"
    },
    {
      id: 6,
      text: "In the last month, how often have you found that you could not cope with all the things you had to do?",
      type: "normal"
    },
    {
      id: 7,
      text: "In the last month, how often have you been able to control irritations in your life?",
      type: "reverse"
    },
    {
      id: 8,
      text: "In the last month, how often have you felt that you were on top of things?",
      type: "reverse"
    },
    {
      id: 9,
      text: "In the last month, how often have you been angered because of things outside of your control?",
      type: "normal"
    },
    {
      id: 10,
      text: "In the last month, how often have you felt difficulties were piling up too high to overcome?",
      type: "normal"
    }
  ];

  const options = ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"];

  const getStressLevelInfo = (score) => {
    if (score < 14) {
      return {
        level: "Low",
        description: "Scores suggest minimal stress levels, typically you are coping well (below the normal threshold).",
        colorClass: "stress-low",
        suggestions: [
          "Maintain your current stress management techniques",
          "Practice regular mindfulness to stay aware of your stress levels",
          "Continue with regular exercise and healthy sleep patterns",
          "Share your successful coping strategies with others"
        ]
      };
    } else if (score < 27) {
      return {
        level: "Mid",
        description: "Scores reflect moderate stress levels, showing you are having some strain but you seem to manage (close to or around the normal threshold).",
        colorClass: "stress-mid",
        suggestions: [
          "Consider incorporating daily meditation or deep breathing exercises",
          "Establish clear boundaries between work and personal time",
          "Try progressive muscle relaxation techniques",
          "Schedule regular breaks throughout your day"
        ]
      };
    } else {
      return {
        level: "High",
        description: "Scores indicate significant stress, implying you are experiencing considerable difficulty in managing stress (above the normal threshold).",
        colorClass: "stress-high",
        suggestions: [
          "Consider speaking with a mental health professional",
          "Prioritize self-care and stress reduction activities",
          "Implement structured time management techniques",
          "Practice regular physical exercise to reduce stress"
        ]
      };
    }
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculatePSSScore = () => {
    let total = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const answerIndex = options.indexOf(answer);
      
      if (question.type === "normal") {
        total += answerIndex;
      } else {
        total += 4 - answerIndex;
      }
    });
    return total;
  };
const {user}=useUser();
  const handleSubmit = async () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
      const score = calculatePSSScore();
      
      try {
        await fetch(`http://localhost:3000/user/${user?.primaryEmailAddress?.emailAddress}/pss`, {//3000 john@email.com
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: score
          })
        });
      } catch (error) {
        console.error('Error sending PSS score:', error);
      }
    }
};

  const StressGauge = ({ score }) => {
    return (
      <div className="stress-gauge">
        <div className="gauge-background">
          <div className="gauge-fill" style={{ transform: `rotate(${(score/40) * 180 - 90}deg)` }} />
          <div className="gauge-center" />
          <div className="gauge-needle" style={{ transform: `rotate(${(score/40) * 180 - 90}deg)` }} />
        </div>
        <div className="gauge-markers">
          <span>0</span>
          <span>20</span>
          <span>40</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pss-container">
      <h1>PSS-10 Stress Assessment</h1>
      
      <div className="questions-section">
        {questions.map((question) => (
          <div key={question.id} className="question-block">
            <div className="question-text">{question.text}</div>
            <div className="options-group">
              {options.map((option) => (
                <button
                  key={option}
                  className={`option-button ${answers[question.id] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(question.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={Object.keys(answers).length !== questions.length}
      >
        Calculate Score
      </button>

      {submitted && (() => {
        const score = calculatePSSScore();
        const { level, description, colorClass, suggestions } = getStressLevelInfo(score);
        
        return (
          <div className="results-section">
            <div className="score-display">
              Your PSS Score: {score}
            </div>
            
            <StressGauge score={score} />
            
            <div className="stress-level-info">
              <div className={`stress-level ${colorClass}`}>
                {level} Stress Level
              </div>
              <p className="stress-description">
                {description}
              </p>
            </div>

            <div className="suggestions-card">
              <h3>Personalized Suggestions</h3>
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <span className="suggestion-number">{index + 1}</span>
                    <span className="suggestion-text">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default PSS_Check;
