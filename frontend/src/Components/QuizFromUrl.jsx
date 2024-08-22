import React, { useState } from 'react';
import { useGlobalContext } from './context';
import customFetch from '../utils/util';
import { Spinner } from './Spinner';
import FormItem from './FormItem';

const QuizFromUrl = () => {
  const { setQuiz, activeUser, setQuizID } = useGlobalContext();
  const [article, setArticle] = useState('');
  const [questionType, setQuestionType] = useState('multiple choice');
  const [difficulty, setDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleArticleChange = (e) => {
    setArticle(e.target.value);
  };

  const handleQuestionCountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setQuestionCount(value);
    }
  };

  const handleQuestionDifficulty = (e) => {
    const value = e.target.value;
    setDifficulty(value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await customFetch.post(
        '/quiz/article/?user=' +
          encodeURIComponent(activeUser ? activeUser?.id : null),
        {
          article,
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

      console.log(data);
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
      <div className="w-screen">
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-md mx-auto flex flex-col lg:w-screen sm:w-full"
        >
          <FormItem
            itemName={'article'}
            placeholder={'article URL'}
            itemValue={article}
            handleChangeFunc={handleArticleChange}
            type="text"
          />

          <FormItem
            itemName={'difficulty'}
            itemValue={difficulty}
            handleChangeFunc={handleQuestionDifficulty}
            itemType={'select'}
            options={['easy', 'medium', 'hard']}
          />

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

export default QuizFromUrl;
