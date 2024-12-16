import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCard from "../components/CustomCard";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "MentalWell - Home";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16 text-center">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
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
          <div className="mt-16 grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center">
            <CustomCard
              to="/cognitive-assessment"
              icon="🧠"
              title="Cognitive Assessment"
              description="Advanced cognitive tests to evaluate mental wellness and identify potential areas of improvement."
            />
            <CustomCard
              to="/emotion-detection"
              icon="😊"
              title="Emotion Detection"
              description="Utilize cutting-edge AI to analyze facial expressions and understand emotional states."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
