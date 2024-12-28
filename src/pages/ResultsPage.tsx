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
            "#FF6384", // Red
            "#36A2EB", // Blue
            "#FFCE56", // Yellow
            "#4BC0C0", // Teal
            "#9966FF", // Purple
            "#FF9F40", // Orange
          ],
          borderColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-800"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !cognitiveData || !emotionData) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <div className="text-center text-red-600 text-xl">{error}</div>
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
          Assessment Results
        </h1>

        <div className="flex flex-wrap justify-center md:justify-between gap-4">
          {/* Cognitive Assessment Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[45%]">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Cognitive Assessment
            </h2>
            <div className="relative w-full bg-gray-200 rounded-full h-6 mb-4">
              <div
                className="bg-blue-500 h-6 rounded-full"
                style={{
                  width: `${cognitiveData?.percentage_score}%`,
                  transition: "width 1.5s ease-in-out",
                }}
              ></div>
            </div>
            <p className="text-xl text-center font-bold mb-4">
              {cognitiveData?.percentage_score.toFixed(2)}%
            </p>
            <p className="text-gray-700">{cognitiveData?.test_summary}</p>
          </div>

          {/* Emotion Analysis Card with Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[45%]">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">
              Emotion Analysis
            </h2>
            <div className="mb-6">
              <Bar
                data={emotionChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                    title: { display: true, text: "Emotion Analysis Chart" },
                  },
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Analysis type: {emotionData?.type}
            </p>
          </div>
        </div>

        {/* Combined Score Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Combined Mental Health Score
          </h2>
          <div className="relative w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
              className="bg-green-500 h-6 rounded-full"
              style={{
                width: `${calculateCombinedScore()}%`,
                transition: "width 1.5s ease-in-out",
              }}
            ></div>
          </div>
          <p className="text-xl text-center font-bold">
            {calculateCombinedScore().toFixed(2)}%
          </p>
        </div>

        {/* Areas of Improvement */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            Areas for Improvement
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {cognitiveData?.areas_of_improvement.map((area, index) => (
              <li key={index} className="text-lg">
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Test Information */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Test Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Cognitive Test Date: </span>
                {new Date(cognitiveData?.submitted_at || "").toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Emotion Analysis Date: </span>
                {new Date(emotionData?.timestamp || "").toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {isModalOpen && <LoginWarningModal {...modalProps} />}
    </div>
  );
};

export default ResultsPage;