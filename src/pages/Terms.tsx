// TermsOfServicePage.tsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - Terms of Service";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white py-8 px-4 md:py-12">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              Terms of Service
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed tracking-wide px-4">
              Last updated: December 29, 2024
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Acceptance of Terms
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                By accessing or using MentalWell's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Use of Services
              </h2>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Medical Disclaimer
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                MentalWell is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions you may have regarding medical conditions.
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Intellectual Property
              </h2>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Contact Information
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="text-gray-600">
                <p>Email: legal@mentalwell.com</p>
                <p>Phone: +1 (123) 456-7890</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;