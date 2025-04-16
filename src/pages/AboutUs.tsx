import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const AboutUsPage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - About Us";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-screen-xl">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium text-[#333] mb-4">
              About MentalWell
            </h1>
            <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-2xl mx-auto">
              Empowering individuals through innovative mental health assessment and support
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
                Our Mission
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed">
                At MentalWell, we're dedicated to making mental health assessment and support accessible to everyone. By combining advanced technology with a compassionate approach, we aim to help individuals better understand and improve their mental well-being.
              </p>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Our Values
              </h2>
              <div className="space-y-4">
                <div className="text-[#555]">
                  <strong className="text-[#333]">Innovation:</strong> We leverage cutting-edge technology to provide accurate and meaningful mental health insights.
                </div>
                <div className="text-[#555]">
                  <strong className="text-[#333]">Accessibility:</strong> We believe mental health resources should be available to everyone, regardless of their background.
                </div>
                <div className="text-[#555]">
                  <strong className="text-[#333]">Privacy:</strong> We maintain the highest standards of data protection and user privacy.
                </div>
                <div className="text-[#555]">
                  <strong className="text-[#333]">Empowerment:</strong> We provide tools and insights that help individuals take control of their mental well-being.
                </div>
              </div>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-6">
                Our Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#f0f0e8] p-6 border border-[#eaeae5]">
                  <h3 className="text-xl font-medium text-[#333] mb-2">Dr. Sarah Chen</h3>
                  <p className="text-[#90a870] mb-3">Chief Medical Officer</p>
                  <p className="text-[#555]">
                    With over 15 years of experience in mental health, Dr. Chen leads our medical strategy and ensures all assessments meet clinical standards.
                  </p>
                </div>

                <div className="bg-[#f0f0e8] p-6 border border-[#eaeae5]">
                  <h3 className="text-xl font-medium text-[#333] mb-2">Mike Johnson</h3>
                  <p className="text-[#90a870] mb-3">Tech Lead</p>
                  <p className="text-[#555]">
                    Mike brings expertise in AI and machine learning, ensuring our platform delivers accurate and reliable assessments.
                  </p>
                </div>

                <div className="bg-[#f0f0e8] p-6 border border-[#eaeae5]">
                  <h3 className="text-xl font-medium text-[#333] mb-2">Emma Thompson</h3>
                  <p className="text-[#90a870] mb-3">User Experience Director</p>
                  <p className="text-[#555]">
                    Emma ensures our platform is intuitive and accessible, creating a comfortable experience for all users.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;