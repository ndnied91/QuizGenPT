import React, { useEffect, useState } from 'react';

const Results = ({ answerKey, setCompleted }) => {
  const [score, setScore] = useState('');
  const calculateScore = () => {
    let correct = 0;
    answerKey.map((answer) => {
      if (answer.selectedAnswer === answer.correctAnswer) {
        correct++;
      }
    });

    setScore(Math.floor((correct / answerKey.length) * 100) + '%');
  };

  useEffect(() => {
    calculateScore();
  }, []);

  return (
    <div className="text-center">
      <p className="text-3xl">Results</p>
      <p className="text-xl"> Your score: {score} </p>

      <div className="flex gap-2 mt-10">
        <div
          className="bg-red-500 w-max p-4 rounded-lg shadow-md text-white text-xl cursor-pointer"
          onClick={() => setCompleted(false)}
        >
          Retake test
        </div>
        <div className="bg-blue-500 w-max p-4 rounded-lg shadow-md text-white text-xl cursor-pointer">
          Get more similar question
        </div>
      </div>
    </div>
  );
};

export default Results;
