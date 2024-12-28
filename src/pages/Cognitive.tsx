import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getQuestions, submitPersonalityTest } from "../services/test";
import FinishModal from "../components/FinishModal";

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
  

  // Modified this function to check if current question is answered
  const areAllQuestionsAnswered = () => {
    return isCurrentQuestionAnswered();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Cognitive Assessment
          </h1>

          {questions.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mb-6">
              {/* Progress Indicator */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-lg font-medium text-gray-800 mb-4">
                  {questions[currentQuestionIndex].text}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                    <label
                      key={idx}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${responses[currentQuestionIndex] === option 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={responses[currentQuestionIndex] === option}
                        onChange={(e) => handleAnswerChange(e, currentQuestionIndex)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-4 px-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${currentQuestionIndex === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'}`}
                >
                  ← Previous
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={processing || !isCurrentQuestionAnswered()}
                    className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all duration-300
                      ${processing || !areAllQuestionsAnswered()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'}`}
                  >
                    {processing ? 'Submitting...' : 'Submit Assessment'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!isCurrentQuestionAnswered()}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300
                      ${!isCurrentQuestionAnswered()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'}`}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          )}
        </div>
      </main>

      <FinishModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        title="Assessment Complete!"
        message="Thank you for completing the cognitive assessment test."
      />

      <Footer />
    </div>
  );
};

export default CognitiveAssessment;