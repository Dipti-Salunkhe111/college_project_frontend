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

  const areAllQuestionsAnswered = () => {
    return responses.every(response => response !== "");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Cognitive Assessment
          </h1>

          {questions.length > 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-8">
                <p className="text-xl font-medium mb-6">
                  {questions[currentQuestionIndex].text}
                </p>

                {/* Answer Options */}
                <div className="space-y-4">
                  {questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                    <label
                      key={idx}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={responses[currentQuestionIndex] === option}
                        onChange={(e) => handleAnswerChange(e, currentQuestionIndex)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Previous
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={processing || !areAllQuestionsAnswered()}
                    className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                      processing || !areAllQuestionsAnswered()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {processing ? 'Submitting...' : 'Submit'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!isCurrentQuestionAnswered()}
                    className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                      !isCurrentQuestionAnswered()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      <FinishModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        title="Assessment Complete!"
        message="You have successfully completed the cognitive assessment test."
      />

      <Footer />
    </>
  );
};

export default CognitiveAssessment;