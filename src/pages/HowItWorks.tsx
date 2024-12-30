// HowItWorksPage.tsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HowItWorksPage: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - How It Works";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white py-8 px-4 md:py-12">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              How MentalWell Works
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed tracking-wide px-4">
              Understanding your mental well-being through comprehensive assessment and analysis
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Step 1: Cognitive Assessment
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                Our cognitive assessment evaluates various aspects of your mental acuity, including memory, problem-solving skills, and cognitive flexibility. This test is designed to give us insights into your overall cognitive functioning.
              </p>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Step 2: Facial Expression Analysis
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                Our advanced AI system analyzes facial expressions to understand emotional patterns and responses, providing valuable insights into emotional well-being.
              </p>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Step 3: Comprehensive Analysis
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                We combine data from both assessments to provide a holistic view of your mental well-being, with cognitive scores contributing 30% and emotional analysis 70% to the final assessment.
              </p>
              <div className="space-y-3 text-gray-600">
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
            </section>

            <section className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                Step 4: Personalized Recommendations
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                Based on your assessment results, we provide tailored recommendations and insights to help improve your mental well-being.
              </p>
              <div className="space-y-3 text-gray-600">
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
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;