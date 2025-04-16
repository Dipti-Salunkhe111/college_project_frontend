import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const HowItWorksPage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - How It Works";
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
              How MentalWell Works
            </h1>
            <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-2xl mx-auto">
              Understanding your mental well-being through comprehensive assessment and analysis
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
                Step 1: Cognitive Assessment
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                Our cognitive assessment evaluates various aspects of your mental acuity, including memory, problem-solving skills, and cognitive flexibility. This test is designed to give us insights into your overall cognitive functioning.
              </p>
              <div className="space-y-3 text-[#555]">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Complete a series of engaging cognitive tasks designed to measure different aspects of mental performance</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Receive detailed feedback on memory, attention, and problem-solving abilities</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Get insights into your cognitive strengths and areas for improvement</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="bg-[#f8f8f5] p-8 border border-[#eaeae5] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Step 2: Facial Expression Analysis
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                Our advanced AI system analyzes facial expressions to understand emotional patterns and responses, providing valuable insights into emotional well-being.
              </p>
              <div className="space-y-3 text-[#555]">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>AI-powered analysis of facial expressions during specific prompts</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Detection of various emotional states and their intensities</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pattern recognition to identify emotional response trends</span>
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
                Step 3: Comprehensive Analysis
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                We combine data from both assessments to provide a holistic view of your mental well-being, with cognitive scores contributing 30% and emotional analysis 70% to the final assessment.
              </p>
              <div className="space-y-3 text-[#555]">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Integration of cognitive and emotional data for comprehensive insights</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Weighted scoring system reflecting the importance of both components</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Generation of an overall mental well-being score</span>
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
                Step 4: Personalized Recommendations
              </h2>
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-4">
                Based on your assessment results, we provide tailored recommendations and insights to help improve your mental well-being.
              </p>
              <div className="space-y-3 text-[#555]">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Customized suggestions for improving cognitive performance</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Strategies for better emotional regulation and awareness</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Regular progress tracking and updated recommendations</span>
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

export default HowItWorksPage;