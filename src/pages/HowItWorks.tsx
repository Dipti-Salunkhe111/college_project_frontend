import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
          How It Works
        </h1>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Step 1: Cognitive Assessment
          </h2>
          <p className="text-lg text-gray-700">
            Our cognitive assessment evaluates various aspects of your mental
            acuity, including memory, problem-solving skills, and cognitive
            flexibility. This test is designed to give us insights into your
            overall cognitive functioning, which plays a crucial role in mental
            health.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
            <li className="text-lg">
              Assess cognitive functions such as memory, attention, and problem-solving.
            </li>
            <li className="text-lg">
              Generates a percentage score reflecting your cognitive performance.
            </li>
            <li className="text-lg">
              Helps identify cognitive strengths and areas for improvement.
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Step 2: Facial Expression Analysis
          </h2>
          <p className="text-lg text-gray-700">
            The facial expression analysis assesses your emotions by analyzing
            facial cues. Using advanced AI, the system can detect various
            emotions, such as happiness, sadness, anger, surprise, and more. 
            These emotional insights contribute to understanding your overall
            mental health and well-being.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
            <li className="text-lg">
              Tracks and analyzes facial expressions to detect emotions.
            </li>
            <li className="text-lg">
              Identifies patterns of emotional responses over time.
            </li>
            <li className="text-lg">
              Helps provide a more comprehensive view of emotional health.
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Step 3: Overall Mental Health Score
          </h2>
          <p className="text-lg text-gray-700">
            By combining the insights from the cognitive assessment and the
            facial expression analysis, we create a holistic mental health score
            that reflects both your cognitive functioning and emotional well-being.
            This score is a valuable indicator of your overall mental health status.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
            <li className="text-lg">
              Cognitive assessment score contributes 30% to the overall mental health score.
            </li>
            <li className="text-lg">
              Facial expression analysis contributes 70% to the overall mental health score.
            </li>
            <li className="text-lg">
              Provides actionable insights to help improve both cognitive and emotional health.
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Step 4: Areas for Improvement
          </h2>
          <p className="text-lg text-gray-700">
            After analyzing the results from both assessments, we provide you with
            personalized recommendations for areas to focus on for improving your
            mental health. These recommendations are based on both cognitive and
            emotional factors, helping you take proactive steps toward better
            mental well-being.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
            <li className="text-lg">
              Receive personalized areas of improvement based on test results.
            </li>
            <li className="text-lg">
              Focus on specific strategies to enhance cognitive abilities and emotional resilience.
            </li>
            <li className="text-lg">
              Gain insights into areas that can be worked on for better mental health.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;