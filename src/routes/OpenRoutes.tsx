// src/routes/OpenRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "./PrivateRoutes"; // Import PrivateRoutes
import AboutUsPage from "../pages/AboutUs";
import HowItWorksPage from "../pages/HowItWorks";
import ContactPage from "../pages/ContactUs";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import TermsOfServicePage from "../pages/Terms";

const OpenRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        {/* Private Routes */}
        <Route path="/*" element={<PrivateRoutes />} /> {/* This protects your private routes */}
      </Routes>
    </Router>
  );
};

export default OpenRoutes;