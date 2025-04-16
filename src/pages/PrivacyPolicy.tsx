import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - Privacy Policy";
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
              Privacy Policy
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
                Introduction
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                MentalWell ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Information We Collect
              </h2>
              <div className="space-y-3 text-[#555]">
                <p className="mb-4">We collect several types of information for various purposes:</p>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Personal Data: Name, email address, and contact information</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Assessment Data: Results from cognitive tests and emotional analyses</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Usage Data: Information about how you use our website and services</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Technical Data: IP address, browser type, device information</span>
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
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-[#555]">
                <p className="mb-4">Your information is used for the following purposes:</p>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To provide and maintain our services</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To notify you about changes to our services</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To provide customer support</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To gather analysis or valuable information to improve our services</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Data Security
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                The security of your data is important to us. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
              </p>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Contact Us
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="text-[#555]">
                <p>Email: privacy@mentalwell.com</p>
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

export default PrivacyPolicyPage;