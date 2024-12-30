// AboutUsPage.tsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUsPage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - About Us";
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white py-8 px-4 md:py-12">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              About MentalWell
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed tracking-wide px-4">
              Empowering individuals through innovative mental health assessment and support
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Our Mission
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                At MentalWell, we're dedicated to making mental health assessment and support accessible to everyone. By combining advanced technology with a compassionate approach, we aim to help individuals better understand and improve their mental well-being.
              </p>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Our Values
              </h2>
              <div className="space-y-4">
                <div className="text-gray-600">
                  <strong className="text-gray-800">Innovation:</strong> We leverage cutting-edge technology to provide accurate and meaningful mental health insights.
                </div>
                <div className="text-gray-600">
                  <strong className="text-gray-800">Accessibility:</strong> We believe mental health resources should be available to everyone, regardless of their background.
                </div>
                <div className="text-gray-600">
                  <strong className="text-gray-800">Privacy:</strong> We maintain the highest standards of data protection and user privacy.
                </div>
                <div className="text-gray-600">
                  <strong className="text-gray-800">Empowerment:</strong> We provide tools and insights that help individuals take control of their mental well-being.
                </div>
              </div>
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Our Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Sarah Chen</h3>
                  <p className="text-blue-600 mb-3">Chief Medical Officer</p>
                  <p className="text-gray-600">With over 15 years of experience in mental health, Dr. Chen leads our medical strategy and ensures all assessments meet clinical standards.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Mike Johnson</h3>
                  <p className="text-blue-600 mb-3">Tech Lead</p>
                  <p className="text-gray-600">Mike brings expertise in AI and machine learning, ensuring our platform delivers accurate and reliable assessments.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Emma Thompson</h3>
                  <p className="text-blue-600 mb-3">User Experience Director</p>
                  <p className="text-gray-600">Emma ensures our platform is intuitive and accessible, creating a comfortable experience for all users.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;