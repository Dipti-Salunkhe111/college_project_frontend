import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getQuestions, submitPersonalityTest } from "../services/test";
import FinishModal from "../components/FinishModal";
import { motion } from "framer-motion";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const CognitiveAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {
    document.title = "MentalWell - Cognitive Assessment";
    
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
        setResponses(new Array(fetchedQuestions.length).fill(""));
      } catch (error) {
        toast.error("Failed to load questions");
        navigate("/");
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = e.target.value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    try {
      setProcessing(true);
      const questionsData = questions.map((question, index) => ({
        question_id: question.id,
        question_text: question.text,
        selected_answer: responses[index]
      }));
  
      await submitPersonalityTest(questionsData);
      setShowFinishModal(true);
    } catch (error) {
      toast.error("Failed to submit assessment");
    } finally {
      setProcessing(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isCurrentQuestionAnswered = () => {
    return responses[currentQuestionIndex] !== "";
  };

  const areAllQuestionsAnswered = () => {
    return isCurrentQuestionAnswered();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-screen-xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium text-[#333] mb-4">
              Cognitive Assessment
            </h1>
            <p className="text-[#555] max-w-2xl mx-auto">
              This assessment helps us understand your cognitive patterns and provide personalized insights for your mental wellness journey.
            </p>
          </motion.div>

          {questions.length > 0 ? (
            <motion.div 
              className="bg-white p-8 rounded-none shadow-md max-w-3xl mx-auto mb-12 border border-[#eaeae5]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#555]">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-[#555]">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-[#f0f0e8] rounded-none h-2">
                  <div
                    className="bg-[#90a870] h-2 rounded-none transition-all duration-300 ease-in-out"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="bg-[#f8f8f5] rounded-none p-6 mb-8 border border-[#eaeae5]">
                <h2 className="text-xl font-medium text-[#333] mb-6">
                  {questions[currentQuestionIndex].text}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                    <label
                      key={idx}
                      className={`flex items-center p-4 border-2 rounded-none cursor-pointer transition-all duration-200
                        ${responses[currentQuestionIndex] === option 
                          ? 'border-[#90a870] bg-[#f0f0e8]' 
                          : 'border-[#eaeae5] hover:border-[#c0c0b0] hover:bg-[#fafaf7]'}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={responses[currentQuestionIndex] === option}
                        onChange={(e) => handleAnswerChange(e, currentQuestionIndex)}
                        className="h-5 w-5 text-[#90a870] focus:ring-[#90a870] border-[#aeae9e]"
                      />
                      <span className="ml-3 text-base text-[#555]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-3 font-medium transition-all duration-300
                    ${currentQuestionIndex === 0
                      ? 'bg-[#f0f0e8] text-[#aeae9e] cursor-not-allowed'
                      : 'border border-[#333] text-[#333] hover:bg-[#f0f0e8]'}`}
                >
                  ← Previous
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={processing || !isCurrentQuestionAnswered()}
                    className={`px-8 py-3 font-medium transition-all duration-300
                      ${processing || !areAllQuestionsAnswered()
                        ? 'bg-[#c0c0b0] text-white cursor-not-allowed'
                        : 'bg-[#90a870] text-white hover:bg-[#7d9460]'}`}
                  >
                    {processing ? 'Submitting...' : 'Submit Assessment'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!isCurrentQuestionAnswered()}
                    className={`px-8 py-3 font-medium transition-all duration-300
                      ${!isCurrentQuestionAnswered()
                        ? 'bg-[#c0c0b0] text-white cursor-not-allowed'
                        : 'bg-[#90a870] text-white hover:bg-[#7d9460]'}`}
                  >
                    Next →
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#90a870] border-t-transparent"></div>
            </div>
          )}
        </div>
      </main>

      <FinishModal
        isOpen={showFinishModal}
        onClose={() => {
          setShowFinishModal(false);
          navigate("/");
        }}
        title="Assessment Complete!"
        message="Thank you for completing the cognitive assessment test. Your results will help us provide personalized insights for your mental wellness journey."
      />

      <Footer />
    </div>
  );
};

export default CognitiveAssessment;