import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';
import CognitiveAssessment from '../pages/Cognitive';
import EmotionDetection from '../pages/FacialAnalysis';
import ResultsPage from '../pages/ResultsPage';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isLoggedIn = isTokenValid(); // Use token validation

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if token is invalid
  }

  return element;
};

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/cognitive-assessment" 
        element={<PrivateRoute element={<CognitiveAssessment />} />} 
      />
      <Route 
        path="/emotion-detection" 
        element={<PrivateRoute element={<EmotionDetection />} />} 
      />
      <Route 
      path="/results" 
      element={<PrivateRoute element={<ResultsPage />} />}  />
    </Routes>
  );
};

export default PrivateRoutes;