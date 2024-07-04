import React, { useEffect, useState } from 'react';
import customFetch from '../utils/util';
import { useGlobalContext } from './context';

const Results = ({
  answerKey,
  setCompleted,
  activeUser,
  quizID,
  setQuiz,
  quiz,
}) => {
  const {} = useGlobalContext();

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

  const completeQuiz = async () => {
    try {
      const response = await customFetch.post(`/quiz/${quizID._id}`, {
        user: quizID.user,
        to_update: { is_active: false },
      });
      if (response.status === 200) {
        console.log('Update successful');
        setQuiz([]);
        setCompleted(false);
      } else {
        console.log('Update failed');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleFinishQuiz = () => {
    if (activeUser) {
      completeQuiz();
    } else {
      setQuiz([]);
      setCompleted(false);
    }
  };

  console.log(quiz);

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

        <div
          className="bg-green-500 w-max p-4 rounded-lg shadow-md text-white text-xl cursor-pointer"
          onClick={handleFinishQuiz}
        >
          Finish Quiz
        </div>
      </div>
    </div>
  );
};

export default Results;
