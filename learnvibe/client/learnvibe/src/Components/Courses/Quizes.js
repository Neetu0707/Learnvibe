import React, { useState } from "react";
import { toast } from "react-toastify";

const Quiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) {
      toast.error("Please select an option before proceeding!");
      return;
    }
    const isCorrect = selectedOption === quiz.questions[currentQuestionIndex].answer;
    setUserAnswers([...userAnswers, { question: currentQuestionIndex + 1, selected: selectedOption, correct: quiz.questions[currentQuestionIndex].answer, isCorrect }]);
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSkip = () => {
    setUserAnswers([...userAnswers, { question: currentQuestionIndex + 1, selected: null, correct: quiz.questions[currentQuestionIndex].answer, isCorrect: false }]);
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctAnswers = userAnswers.filter(ans => ans.isCorrect).length;
  const skippedAnswers = userAnswers.filter(ans => ans.selected === null).length;
  const incorrectAnswers = userAnswers.length - correctAnswers - skippedAnswers;

  return (
    <div className="p-5 max-w-xl mx-auto shadow-md rounded-lg">
      {submitted ? (
        showAnalysis ? (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Quiz Review</h2>
            <div className="space-y-4">
              {userAnswers.map((ans, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md bg-gray-100">
                  <p className="font-semibold text-gray-900">Q{ans.question}: {quiz.questions[index].question}</p>
                  <p className={`mt-1 ${ans.isCorrect ? "text-green-600" : "text-red-600"}`}>Your Answer: {ans.selected || "Skipped"}</p>
                  <p className="text-blue-600">Correct Answer: {ans.correct}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md" onClick={() => setShowAnalysis(false)}>
              Back to Analysis
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Analysis</h2>
            <div className="bg-gray-200 p-5 rounded-lg shadow-md">
              <p className="text-lg text-green-600 font-semibold">✅ Correct Answers: {correctAnswers}</p>
              <p className="text-lg text-red-600 font-semibold">❌ Incorrect Answers: {incorrectAnswers}</p>
              <p className="text-lg text-yellow-600 font-semibold">⏭ Skipped Questions: {skippedAnswers}</p>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md" onClick={() => setShowAnalysis(true)}>
              View Answers
            </button>
          </div>
        )
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-3">{quiz.questions[currentQuestionIndex].question}</h2>
          <div className="space-y-2">
            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`block w-full p-3 border rounded-lg ${selectedOption === option ? "bg-blue-500 text-white" : ""}`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {currentQuestionIndex < quiz.questions.length - 1 && (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                onClick={handleSkip}
              >
                Skip
              </button>
            )}
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;