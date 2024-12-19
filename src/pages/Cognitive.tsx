import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getQuestions, submitPersonalityTest } from "../services/test";

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
      // Prepare questions data
      const questionsData = questions.map((question, index) => ({
        question_id: question.id,
        question_text: question.text,
        selected_answer: responses[index]
      }));

      const result = await submitPersonalityTest(questionsData);
      
      toast.success("Assessment submitted successfully!");
      navigate("/", { 
        state: { 
          questionsData,
          submissionId: result.submission_id 
        } 
      });
    } catch (error) {
      toast.error("Failed to submit assessment");
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Cognitive Assessment
          </h1>

          {questions.length > 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              {/* Current Question */}
              <p className="text-xl font-medium mb-4">
                {questions[currentQuestionIndex].text}
              </p>

              {/* Render Dynamic Options */}
              <div className="space-y-4 mb-6">
                {questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={responses[currentQuestionIndex] === option}
                      onChange={(e) =>
                        handleAnswerChange(e, currentQuestionIndex)
                      }
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                >
                  Previous
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading questions...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CognitiveAssessment;