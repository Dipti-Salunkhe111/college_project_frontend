import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginWarningModal from "../components/LoginWarning";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getCognitiveTestData, getEmotionTestData } from "../services/test";
import { CognitiveTestResult, EmotionTestResult } from "../services/test";
import { motion } from "framer-motion";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  initialPath: string;
}

const ResultsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cognitiveData, setCognitiveData] = useState<CognitiveTestResult | null>(null);
  const [emotionData, setEmotionData] = useState<EmotionTestResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cognitiveResult, emotionResult] = await Promise.all([
          getCognitiveTestData(),
          getEmotionTestData(),
        ]);
        setCognitiveData(cognitiveResult);
        setEmotionData(emotionResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load test results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateCombinedScore = () => {
    if (!cognitiveData || !emotionData) return 0;
    const cognitiveScore = cognitiveData.percentage_score;
    const emotionScore =
      ((emotionData.scores.happy * 100) +
        ((1 - emotionData.scores.sad) * 100)) /
      2;
    return 0.3 * cognitiveScore + 0.7 * emotionScore;
  };

  const getEmotionChartData = (emotionData: EmotionTestResult | null) => {
    if (!emotionData) return { labels: [], datasets: [] };
    const labels = Object.keys(emotionData.scores);
    const data = Object.values(emotionData.scores).map((score) => score * 100);

    return {
      labels,
      datasets: [
        {
          label: "Emotion Scores (%)",
          data,
          backgroundColor: [
            "#90a870", // Primary green
            "#7d9460", // Hover green
            "#a8b98f", // Light green
            "#c0c9b0", // Lighter green
            "#d8e0d1", // Very light green
            "#f0f0e8", // Near-white
          ],
          borderColor: [
            "#90a870",
            "#7d9460",
            "#a8b98f",
            "#c0c9b0",
            "#d8e0d1",
            "#f0f0e8",
          ],
          borderWidth: 1,
          barThickness: 30,
          maxBarThickness: 30,
          categoryPercentage: 0.5,
          barPercentage: 0.5,
        },
      ],
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
        <Header />
        <main className="flex-grow container mx-auto max-w-screen-xl p-6">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#90a870]"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !cognitiveData || !emotionData) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
        <Header />
        <main className="flex-grow container mx-auto max-w-screen-xl p-6">
          <div className="text-center text-[#555] text-xl">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  const modalProps: ModalProps = {
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
    onLoginSuccess: () => setIsModalOpen(false),
    initialPath: "/results",
  };

  const emotionChartData = getEmotionChartData(emotionData);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0]">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-xl p-6">
        <motion.h1
          className="text-3xl md:text-5xl font-medium text-[#333] mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Assessment Results
        </motion.h1>

        <div className="flex flex-wrap justify-center md:justify-between gap-4">
          {/* Cognitive Assessment Card */}
          <motion.div
            className="bg-[#f8f8f5] shadow-lg p-6 border border-[#eaeae5] w-full md:w-[45%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-medium text-[#333] mb-4">
              Cognitive Assessment
            </h2>
            <div className="relative w-full bg-[#eaeae5] h-6 mb-4">
              <div
                className="bg-[#90a870] h-6"
                style={{
                  width: `${cognitiveData?.percentage_score}%`,
                  transition: "width 1.5s ease-in-out",
                }}
              ></div>
            </div>
            <p className="text-xl text-center font-medium text-[#333] mb-4">
              {cognitiveData?.percentage_score.toFixed(2)}%
            </p>
            <p className="text-[#555]">{cognitiveData?.test_summary}</p>
          </motion.div>

          {/* Emotion Analysis Card with Chart */}
          <motion.div
            className="bg-[#f8f8f5] shadow-lg p-6 border border-[#eaeae5] w-full md:w-[45%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-medium text-[#333] mb-4">
              Emotion Analysis
            </h2>
            <div className="mb-6">
              <Bar
                data={emotionChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top", labels: { color: "#333" } },
                    title: { display: true, text: "Emotion Analysis Chart", color: "#333" },
                  },
                  scales: {
                    x: { ticks: { color: "#555" } },
                    y: { ticks: { color: "#555" } },
                  },
                }}
              />
            </div>
            <p className="text-sm text-[#555] mt-4">
              Analysis type: {emotionData?.type}
            </p>
          </motion.div>
        </div>

        {/* Combined Score Card */}
        <motion.div
          className="bg-[#f8f8f5] shadow-lg p-6 border border-[#eaeae5] w-full mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-2xl font-medium text-[#333] mb-4">
            Overall Mental Health Score
          </h2>
          <div className="relative w-full bg-[#eaeae5] h-6 mb-4">
            <div
              className="bg-[#90a870] h-6"
              style={{
                width: `${calculateCombinedScore()}%`,
                transition: "width 1.5s ease-in-out",
              }}
            ></div>
          </div>
          <p className="text-xl text-center font-medium text-[#333]">
            {calculateCombinedScore().toFixed(2)}%
          </p>
        </motion.div>

        {/* Areas of Improvement */}
        <motion.div
          className="bg-[#f8f8f5] shadow-lg p-6 border border-[#eaeae5] w-full mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h2 className="text-2xl font-medium text-[#333] mb-4">
            Areas for Improvement
          </h2>
          <ul className="list-disc list-inside space-y-2 text-[#555]">
            {cognitiveData?.areas_of_improvement.map((area, index) => (
              <li key={index} className="text-lg">
                {area}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Test Information */}
        <motion.div
          className="bg-[#f8f8f5] shadow-lg p-6 border border-[#eaeae5] w-full mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <h2 className="text-2xl font-medium text-[#333] mb-4">
            Test Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#555]">
                <span className="font-medium text-[#333]">Cognitive Test Date: </span>
                {new Date(cognitiveData?.submitted_at || "").toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[#555]">
                <span className="font-medium text-[#333]">Emotion Analysis Date: </span>
                {new Date(emotionData?.timestamp || "").toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
      {isModalOpen && <LoginWarningModal {...modalProps} />}
    </div>
  );
};

export default ResultsPage;