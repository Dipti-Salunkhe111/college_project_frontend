import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import CognitiveAssessment from '../pages/Cognitive';
import EmotionDetection from '../pages/FacialAnalysis';

const OpenRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cognitive-assessment" element={<CognitiveAssessment />} />
        <Route path="/emotion-detection" element={<EmotionDetection />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default OpenRoutes;
