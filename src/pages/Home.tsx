import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCard from "../components/CustomCard";
import { getCognitiveTestStatus, getEmotionStatus } from "../services/test";
import LoginWarningModal from "../components/LoginWarning";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [cognitiveTestCompleted, setCognitiveTestCompleted] = useState(false);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [emotionStatus, setEmotionStatus] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [initialPath, setInitialPath] = useState(""); // Store the initial path the user wanted to access

  useEffect(() => {
    document.title = "MentalWell - Home";

    const checkTestStatus = async () => {
      if (isTokenValid()) {
        try {
          const cognitiveStatus = await getCognitiveTestStatus();
          setCognitiveTestCompleted(cognitiveStatus.has_completed_test);
          if (cognitiveStatus.completed_at) {
            setCompletedAt(new Date(cognitiveStatus.completed_at).toLocaleDateString());
          }

          const email = localStorage.getItem("username");
          if (email) {
            const emotionData = await getEmotionStatus(email);
            setEmotionStatus(emotionData.data);
          }
        } catch (error) {
          console.error("Failed to fetch status:", error);
        }
      }
    };

    checkTestStatus();
  }, []);

  const handleCardClick = (path: string) => {
    if (isTokenValid()) {
      if (path === "/cognitive-assessment" && cognitiveTestCompleted) {
        alert(`You have already completed the Cognitive Assessment test on ${completedAt}.`);
        return;
      }
      if (path === "/emotion-detection" && emotionStatus && emotionStatus.length > 0) {
        alert(`You have already completed the Facial Sentiment Assessment.`);
        return;
      }
      navigate(path);
    } else {
      setInitialPath(path); // Save the attempted path
      setIsModalOpen(true); // Show the modal
    }
  };

  const handleLoginSuccess = (path: string) => {
    setIsModalOpen(false); // Close the modal
    navigate(path); // Navigate to the page the user tried to access
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal without login
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white max-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
              Empowering Mental Health Awareness with Technology
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed tracking-wide">
              MentalWell combines advanced cognitive assessment and emotion detection to provide personalized insights into your mental well-being. Our innovative approach helps you understand and improve your mental health.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <CustomCard
              to="/cognitive-assessment"
              icon="🧠"
              title={cognitiveTestCompleted ? "Cognitive Assessment (Completed)" : "Cognitive Assessment"}
              description={cognitiveTestCompleted ? `You have completed this assessment on ${completedAt}.` : "Advanced cognitive tests to evaluate mental wellness and identify potential areas of improvement."}
              onClick={() => handleCardClick("/cognitive-assessment")}
              className={cognitiveTestCompleted ? "opacity-75 cursor-not-allowed" : ""}
              disabled={cognitiveTestCompleted}
            />
            <CustomCard
              to="/emotion-detection"
              icon="😊"
              title={emotionStatus && emotionStatus.length > 0 ? "Emotion Detection (Completed)" : "Emotion Detection"}
              description={emotionStatus && emotionStatus.length > 0 ? `You have completed this assessment on ${new Date(emotionStatus[0].timestamp).toLocaleDateString()}.` : "Utilize cutting-edge AI to analyze facial expressions and understand emotional states."}
              onClick={() => handleCardClick("/emotion-detection")}
              className={emotionStatus && emotionStatus.length > 0 ? "opacity-75 cursor-not-allowed" : ""}
              disabled={emotionStatus && emotionStatus.length > 0}
            />
          </div>
        </div>
      </main>
      <Footer />

      {/* Render the modal */}
      <LoginWarningModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLoginSuccess={handleLoginSuccess}
        initialPath={initialPath}
      />
    </div>
  );
};

export default Home;