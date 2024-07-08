import React from 'react';
import { useState } from 'react';

const QuizQuestionnaire = ({ quiz, setCompleted, setAnswerKey }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSave = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }

    const newAnswer = {
      selectedAnswer: selectedAnswer,
      correctAnswer: quiz[currentIndex].correctAnswer,
    };

    setAnswerKey((prevAnswerKey) => [...prevAnswerKey, newAnswer]);
  };

  const getProgress = () => {
    return ((currentIndex + 1) / quiz.length) * 100;
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-1/2 bg-gray-300 h-4 rounded mb-4">
          <div
            className="h-4 bg-blue-500 rounded "
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        <div className="text-lg p-4 bg-gray-100 rounded shadow-md">
          <p className="font-bold">
            {currentIndex + 1}. {quiz[currentIndex].question}
          </p>

          <div className="cursor-pointer">
            {quiz[currentIndex].answers.map((answer, index) => {
              return (
                <div
                  className={
                    selectedAnswer === answer ? 'text-red-500' : 'text-gray-900'
                  }
                  key={index}
                  onClick={() => setSelectedAnswer(answer)}
                >
                  <p key={answer} className="pl-1">
                    {String.fromCharCode(65 + index)}. {answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuizQuestionnaire;
