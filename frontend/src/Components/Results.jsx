import React, { useEffect, useState } from 'react';
import customFetch from '../utils/util';
import { useGlobalContext } from './context';
import { IoCheckmark } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { GoArrowLeft } from 'react-icons/go';

const Results = ({
  answerKey,
  setAnswerKey,
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

  const renderCorrectColor = (questionIndex, answerKey, currentItem) => {
    if (answerKey.length > 0) {
      let { selectedAnswer, correctAnswer } = answerKey[questionIndex];

      if (selectedAnswer === currentItem) {
        return selectedAnswer === correctAnswer
          ? 'text-green-500'
          : 'text-red-500';
      } else if (correctAnswer === currentItem) {
        return 'text-yellow-500';
      }
    }
  };

  const renderIcon = (questionIndex, answerKey, currentItem) => {
    if (!answerKey[questionIndex]) {
      return null; // or any default fallback UI
    }

    const { selectedAnswer, correctAnswer } = answerKey[questionIndex];

    if (selectedAnswer === currentItem) {
      return selectedAnswer === correctAnswer ? (
        <div className="flex items-center">
          <p>
            <IoCheckmark />
          </p>
          <p className="text-xs pl-0.5">You got it!</p>
        </div>
      ) : (
        <div className="flex items-center">
          <p>
            <IoMdClose />
          </p>
          <p className="text-xs pl-0.5">Wrong :/</p>
        </div>
      );
    } else if (correctAnswer === currentItem) {
      return (
        <div className="flex items-center">
          <p>
            <GoArrowLeft />
          </p>
          <p className="text-xs pl-0.5">Here is the right answer</p>
        </div>
      );
    }
  };

  console.log(quiz);

  return (
    <div className="">
      <div>
        <p className="text-xl"> Your score: {score} </p>
        {quiz.map((item, questionIndex) => (
          <div key={questionIndex}>
            <div key={item.question} className="mt-5 flex flex-col items-start">
              <div className="font-semibold">{item.question}</div>
              {item.answers.map((answer, index) => (
                <div
                  key={answer}
                  className={renderCorrectColor(
                    questionIndex,
                    answerKey,
                    answer
                  )}
                >
                  <div className="flex items-center gap-2" key={index}>
                    {String.fromCharCode(65 + index)}. {answer}
                    <div>{renderIcon(questionIndex, answerKey, answer)}</div>
                  </div>
                </div>
              ))}

              <a
                href={item.moreDetailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm mt-2 underline italic"
              >
                Question source
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-10 lg:flex-row lg:gap-4 lg:mt-12">
        {/* Retake Test Button */}
        <div
          className="bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-semibold rounded-lg shadow-lg cursor-pointer py-3 px-6 lg:py-4 lg:px-8 transition-transform duration-300 ease-in-out transform hover:scale-105 w-full lg:w-auto text-center"
          onClick={() => {
            setCompleted(false);
            setAnswerKey([]);
          }}
        >
          Retake Test
        </div>

        {/* Get More Similar Questions Button */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg cursor-pointer py-3 px-6 lg:py-4 lg:px-8 transition-transform duration-300 ease-in-out transform hover:scale-105 w-full lg:w-auto text-center disabled opacity-50 cursor-not-allowed">
          Get More Similar Questions
        </div>

        {/* Finish Quiz Button */}
        <div
          className="bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-lg shadow-lg cursor-pointer py-3 px-6 lg:py-4 lg:px-8 transition-transform duration-300 ease-in-out transform hover:scale-105 w-full lg:w-auto text-center"
          onClick={() => {
            handleFinishQuiz();
            setAnswerKey([]);
          }}
        >
          Finish Quiz
        </div>
      </div>
    </div>
  );
};

export default Results;
