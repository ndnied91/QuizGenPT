import React, { useState } from 'react';
import customFetch from '../utils/util';
import { Spinner } from './Spinner';
import { toast } from 'react-toastify';
import { useGlobalContext } from './context';
import Form from './Form';
import FormItem from './FormItem';

const QuizForm = ({ loading, setLoading }) => {
  const { setQuiz, activeUser, setQuizID } = useGlobalContext();
  const [category, setCategory] = useState('Dogs');
  const [questionType, setQuestionType] = useState('multiple choice');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState('1');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleQuestionCountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setQuestionCount(value);
    }
  };

  const handleQuestionDifficulty = (e) => setDifficulty(e.target.value);

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

      console.log(data);

      if (data.error) {
        toast.error('Please try again');
      }

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
      setLoading(false);
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="w-screen">
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-md mx-auto flex flex-col lg:w-screen sm:w-full "
        >
          <FormItem
            itemName={'category'}
            placeholder={'category'}
            itemValue={category}
            handleChangeFunc={handleCategoryChange}
            type="text"
          />

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold"
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
          </div> */}

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold"
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
          </div> */}

          <FormItem
            itemName={'Difficulty'}
            itemValue={difficulty}
            handleChangeFunc={handleQuestionDifficulty}
            itemType={'select'}
            options={['easy', 'medium', 'hard']}
          />

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="questionCount"
            >
              Number of questions
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
          </div> */}

          <FormItem
            itemName={'Number of questions'}
            placeholder={'How many questions'}
            itemValue={questionCount}
            handleChangeFunc={handleQuestionCountChange}
            type="text"
          />

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
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
