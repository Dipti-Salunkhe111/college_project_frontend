import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCognitiveTestStatus, getEmotionStatus } from "../services/test";
import LoginWarningModal from "../components/LoginWarning";
import { motion } from "framer-motion";

// Define interface for emotion data
interface EmotionData {
  timestamp: string;
  scores: { [key: string]: number };
  type: string;
  filenames: string[];
}

// Define interface for cognitive status
interface CognitiveStatus {
  has_completed_test: boolean;
  completed_at?: string | null;
  total_score?: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [cognitiveTestCompleted, setCognitiveTestCompleted] = useState<boolean>(false);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [emotionStatus, setEmotionStatus] = useState<EmotionData[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialPath, setInitialPath] = useState<string>("");

  useEffect(() => {
    document.title = "MentalWell - Home";

    const checkTestStatus = async () => {
      if (isTokenValid()) {
        try {
          const cognitiveStatus: CognitiveStatus = await getCognitiveTestStatus();
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

  const handleCardClick = (path: string): void => {
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
      setInitialPath(path);
      setIsModalOpen(true);
    }
  };

  const handleLoginSuccess = (path: string): void => {
    setIsModalOpen(false);
    navigate(path);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 bg-[#f8f8f5]">
          <div className="container mx-auto max-w-screen-xl flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-medium text-[#333] mb-6 leading-tight">
                Transform your thoughts, transform your world.
              </h1>
              <p className="text-base md:text-lg text-[#555] mb-8 leading-relaxed">
                Everyone benefits when people feel their best. MentalWell is the proven mental health solution for individuals that changes lives and drives wellness results, everywhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/how-it-works')}
                  className="bg-[#90a870] text-white px-6 py-3 rounded-none hover:bg-[#7d9460] transition-colors duration-300"
                >
                  Request a Demo
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="border border-[#333] text-[#333] px-6 py-3 rounded-none hover:bg-[#f0f0e8] transition-colors duration-300"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="People feeling happy and energized" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-screen-xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-4">
                Trusted by leading organizations
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-10 mt-10 opacity-70">
                <img src="/logos/fortive.png" alt="Fortive" className="h-8" />
                <img src="/logos/applovin.png" alt="AppLovin" className="h-8" />
                <img src="/logos/instacart.png" alt="Instacart" className="h-8" />
                <img src="/logos/healthfulx.png" alt="Healthful X" className="h-8" />
                <img src="/logos/blackrock.png" alt="BlackRock" className="h-8" />
              </div>
            </motion.div>
            
            {/* Services Section */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#333] mb-10 text-center">
                Our Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div 
                  className={`bg-[#f8f8f5] p-8 border border-[#eaeae5] cursor-pointer transition-all duration-300 hover:shadow-md ${
                    cognitiveTestCompleted ? "opacity-75" : ""
                  }`}
                  onClick={() => !cognitiveTestCompleted && handleCardClick("/cognitive-assessment")}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-medium text-[#333] mb-3">
                    {cognitiveTestCompleted ? "Cognitive Assessment (Completed)" : "Cognitive Assessment"}
                  </h3>
                  <p className="text-[#555] mb-4">
                    {cognitiveTestCompleted 
                      ? `You have completed this assessment on ${completedAt}.` 
                      : "Advanced cognitive tests to evaluate mental wellness and identify potential areas of improvement."}
                  </p>
                  {!cognitiveTestCompleted && (
                    <button className="text-[#90a870] font-medium hover:underline">
                      Start Assessment →
                    </button>
                  )}
                </motion.div>
                
                <motion.div 
                  className={`bg-[#f8f8f5] p-8 border border-[#eaeae5] cursor-pointer transition-all duration-300 hover:shadow-md ${
                    emotionStatus && emotionStatus.length > 0 ? "opacity-75" : ""
                  }`}
                  onClick={() => !(emotionStatus && emotionStatus.length > 0) && handleCardClick("/emotion-detection")}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-xl font-medium text-[#333] mb-3">
                    {emotionStatus && emotionStatus.length > 0 
                      ? "Emotion Detection (Completed)" 
                      : "Emotion Detection"}
                  </h3>
                  <p className="text-[#555] mb-4">
                    {emotionStatus && emotionStatus.length > 0 
                      ? `You have completed this assessment on ${new Date(emotionStatus[0].timestamp).toLocaleDateString()}.` 
                      : "Utilize cutting-edge AI to analyze facial expressions and understand emotional states."}
                  </p>
                  {!(emotionStatus && emotionStatus.length > 0) && (
                    <button className="text-[#90a870] font-medium hover:underline">
                      Start Assessment →
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Family Wellness Section */}
        <section className="py-16 px-6 bg-cover bg-center relative" style={{ backgroundImage: "url('/images/family-wellness.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto max-w-screen-xl relative z-10 text-center">
            <motion.div
              className="max-w-2xl mx-auto text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Wellness starting with our plans.
              </h2>
              <p className="text-lg mb-8">
                Embark on a wellness journey with our meticulously crafted plans, designed to nurture your mind, body, and spirit.
              </p>
              <button 
                onClick={() => navigate('/plans')}
                className="border border-white text-white px-8 py-3 rounded-none hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
              >
                Learn more
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

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