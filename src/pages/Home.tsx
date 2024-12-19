import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from '../utils/auth';// Adjust import path as needed
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCard from "../components/CustomCard";
import { getCognitiveTestStatus } from "../services/test";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [cognitiveTestCompleted, setCognitiveTestCompleted] = useState(false);

  useEffect(() => {
    document.title = "MentalWell - Home";
    
    // Check cognitive test status if user is logged in
    const checkTestStatus = async () => {
      if (isTokenValid()) {
        try {
          const status = await getCognitiveTestStatus();
          setCognitiveTestCompleted(status.has_completed_test);
        } catch (error) {
          console.error("Failed to fetch test status", error);
        }
      }
    };

    checkTestStatus();
  }, []);

  const handleCardClick = (path: string) => {
    if (isTokenValid()) {
      if (path === "/cognitive-assessment" && cognitiveTestCompleted) {
        alert("You have already completed the Cognitive Assessment test.");
        return;
      }
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16 text-center">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              Empowering Mental Health Awareness with Technology
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed tracking-wide">
              MentalWell combines advanced cognitive assessment and emotion
              detection to provide personalized insights into your mental
              well-being. Our innovative approach helps you understand and
              improve your mental health.
            </p>
          </div>
          {/* Feature Highlights */}
          <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <CustomCard
              to="/cognitive-assessment"
              icon="🧠"
              title={cognitiveTestCompleted ? "Cognitive Assessment (Completed)" : "Cognitive Assessment"}
              description={
                cognitiveTestCompleted 
                  ? "You have already completed the cognitive assessment test." 
                  : "Advanced cognitive tests to evaluate mental wellness and identify potential areas of improvement."
              }
              onClick={() => handleCardClick("/cognitive-assessment")}
              className={cognitiveTestCompleted ? "opacity-50 cursor-not-allowed" : ""}
            />
            <CustomCard
              to="/emotion-detection"
              icon="😊"
              title="Emotion Detection"
              description="Utilize cutting-edge AI to analyze facial expressions and understand emotional states."
              onClick={() => handleCardClick("/emotion-detection")}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;