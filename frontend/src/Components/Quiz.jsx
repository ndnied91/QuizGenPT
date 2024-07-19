import { useState } from 'react';
import QuizForm from './QuizForm';
import QuizQuestionnaire from './QuizQuestionnaire';
import Results from './Results';
import { useGlobalContext } from './context';
import QuizFromUrl from './QuizFromUrl';

const Quiz = () => {
  const { activeUser } = useGlobalContext();
  const [completed, setCompleted] = useState(false);
  const [answerKey, setAnswerKey] = useState([]);
  const { quiz, setQuiz, quizID } = useGlobalContext();
  const [selectedPane, setSelectedPane] = useState('userInput');
  const [loading, setLoading] = useState(false); //loading screen

  return (
    <>
      {completed ? (
        <div className="w-screen p-4 pl-6 pr-6">
          <Results
            answerKey={answerKey}
            setAnswerKey={setAnswerKey}
            setCompleted={setCompleted}
            activeUser={activeUser}
            quiz={quiz}
            quizID={quizID}
            setQuiz={setQuiz}
          />
        </div>
      ) : quiz?.length >= 1 ? (
        <QuizQuestionnaire
          quiz={quiz}
          setCompleted={setCompleted}
          setAnswerKey={setAnswerKey}
        />
      ) : (
        <div className="flex flex-col justify-center items-center p-4 space-y-4">
          {!loading && (
            <>
              {/* <div className="mb-2">
                <p className="text-center text-2xl font-semibold mb-4 ">
                  Trending Topics
                </p>
                <div className="flex gap-4 flex-wrap justify-around">
                  <button className="bg-green-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
                    Science
                  </button>
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                    Space
                  </button>
                  <button className="bg-gray-700 text-white px-8 py-4 rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                    Math
                  </button>
                  <button className="bg-yellow-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition">
                    History
                  </button>
                </div>
              </div>
              <p> or </p> */}
              <div className="flex gap-4 w-full justify-center mt-2 ">
                <button
                  className={`transition-transform duration-300 ease-in-out px-6 py-3 rounded-lg font-medium w-48 text-white bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 active:shadow-md active:bg-red-700 ${
                    selectedPane !== 'userInput' ? 'opacity-70' : 'scale-105'
                  }`}
                  onClick={() => setSelectedPane('userInput')}
                >
                  Category
                </button>
                <button
                  className={`transition-transform duration-300 ease-in-out px-6 py-3 rounded-lg font-medium w-48 text-white bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 active:shadow-md active:bg-blue-700 ${
                    selectedPane === 'userInput' ? 'opacity-70' : 'scale-105'
                  }`}
                  onClick={() => setSelectedPane('urlInput')}
                >
                  Article
                </button>
              </div>
            </>
          )}

          {selectedPane === 'userInput' ? (
            <QuizForm loading={loading} setLoading={setLoading} />
          ) : (
            <QuizFromUrl />
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
