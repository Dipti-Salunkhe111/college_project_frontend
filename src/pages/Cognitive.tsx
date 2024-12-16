import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CognitiveAssessment: React.FC = () => {
  const questions = [
    "How often does the person appear cheerful and in good spirits over the past two weeks?",
    "How often does the person seem calm and relaxed in the past two weeks?",
    "Has the person been active and vigorous during their daily activities recently?",
    "How often does the person seem refreshed and well-rested after sleeping?",
    "Does the person feel that life is meaningful and worth living in the past month (as per your observations)?",
    "Over the past two weeks, how often has the person shown little interest or pleasure in doing things?",
    "How often has the person appeared down, depressed, or hopeless over the past two weeks?",
    "Has the person experienced trouble falling or staying asleep, or sleeping too much?",
    "How often has the person seemed tired or had little energy in the past two weeks?",
    "Has the person had difficulty concentrating on simple tasks such as reading or watching TV?",
    "Has the person seemed to be moving or speaking very slowly, or been noticeably restless or fidgety?",
    "Has the person expressed thoughts indicating they might be better off dead or harming themselves?",
    "In the last month, how often has the person appeared unable to control the important things in their life?",
    "How often has the person seemed confident in their ability to handle personal problems?",
    "How often has the person expressed that things were going their way?",
    "How often has the person been angered by things that were outside of their control?",
    "Does the person have someone to talk to when they are upset or sad?",
    "Has the person felt lonely or isolated from others in the past month (as per your observations)?",
  ];

  // State to manage current question, answers, and responses
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(
    new Array(questions.length).fill("")
  );

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = e.target.value;
    setResponses(updatedResponses);
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

  const handleSubmit = () => {
    // Handle form submission logic, such as sending data to a server
    console.log("Responses submitted:", responses);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Cognitive Assessment
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md">
            {/* Display the current question */}
            <p className="text-xl font-medium mb-4">
              {questions[currentQuestionIndex]}
            </p>

            {/* Answer options displayed in columns (one per line) */}
            <div className="space-y-4 mb-6">
              {["Never", "Rarely", "Sometimes", "Often", "Always"].map(
                (option) => (
                  <label key={option} className="block">
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
                )
              )}
            </div>

            {/* Navigation buttons */}
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
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CognitiveAssessment;