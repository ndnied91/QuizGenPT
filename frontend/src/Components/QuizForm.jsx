import React, { act, useState } from 'react';
import customFetch from '../utils/util';
import { Spinner } from './Spinner';
import { useGlobalContext } from './context';

const QuizForm = () => {
  const { setQuiz, activeUser, setQuizID } = useGlobalContext();
  const [category, setCategory] = useState('Dogs');
  const [questionType, setQuestionType] = useState('multiple choice');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleQuestionCountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setQuestionCount(value);
    }
  };

  const handleQuestionDifficulty = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setDifficulty(value);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await customFetch.post(
        '/quiz?user=' + encodeURIComponent(activeUser ? activeUser?.id : null),
        {
          category,
          questionType,
          questionCount: Number(questionCount), // Ensure questionCount is a number
          difficulty,
        }
      );

      if (activeUser) {
        setQuiz(data.quiz); //save questions
        setQuizID({ _id: data._id, user: data.user });
      } else {
        setQuiz(data); //save questions
        setQuizID({ _id: 'guest', user: 'guest' });
      }

      setLoading(false);
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <div>
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-md mx-auto flex flex-col w-screen"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              required
              type="text"
              id="category"
              placeholder="Category"
              value={category}
              onChange={handleCategoryChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="questionType"
            >
              Question Type
            </label>
            <select
              id="questionType"
              value={questionType}
              onChange={handleQuestionTypeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="multiple choice">Multiple Choice</option>
              <option value="open ended">Open Ended</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="questionType"
            >
              Difficulty
            </label>
            <select
              id="questionType"
              value={difficulty}
              onChange={handleQuestionDifficulty}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="questionCount"
            >
              How many questions
            </label>
            <input
              required
              type="text"
              id="questionCount"
              placeholder="How many questions"
              value={questionCount}
              onChange={handleQuestionCountChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 w-full tracking-wider text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default QuizForm;
