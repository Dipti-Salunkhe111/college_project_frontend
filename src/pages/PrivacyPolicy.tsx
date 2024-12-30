// PrivacyPolicyPage.tsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - Privacy Policy";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white py-8 px-4 md:py-12">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              Privacy Policy
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed tracking-wide px-4">
              Last updated: December 29, 2024
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Introduction
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                MentalWell ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Information We Collect
              </h2>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Data Security
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                The security of your data is important to us. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Contact Us
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="text-gray-600">
                <p>Email: privacy@mentalwell.com</p>
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

export default PrivacyPolicyPage;