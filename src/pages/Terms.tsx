import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - Terms of Service";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-screen-xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium text-[#333] mb-4">
              Terms of Service
            </h1>
            <p className="text-base md:text-lg text-[#555] leading-relaxed">
              Last updated: December 29, 2024
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                By accessing or using MentalWell's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Use of Services
              </h2>
              <div className="space-y-3 text-[#555]">
                <p className="mb-4">By using our services, you agree to:</p>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Provide accurate and complete information when using our services</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Use the services only for lawful purposes</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Not attempt to interfere with or disrupt our services</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Medical Disclaimer
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                MentalWell is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions you may have regarding medical conditions.
              </p>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-3 text-[#555]">
                <p className="mb-4">All content on this website is the property of MentalWell and is protected by copyright laws.</p>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You may not modify or reproduce any content without permission</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You may not use our trademarks without written consent</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Contact Information
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="text-[#555]">
                <p>Email: legal@mentalwell.com</p>
                <p>Phone: +1 (123) 456-7890</p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;