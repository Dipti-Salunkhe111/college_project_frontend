// src/routes/OpenRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "./PrivateRoutes"; // Import PrivateRoutes

const OpenRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* Private Routes */}
        <Route path="/*" element={<PrivateRoutes />} /> {/* This protects your private routes */}
      </Routes>
    </Router>
  );
};

export default OpenRoutes;