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
            <div className="flex gap-4 w-full justify-center mt-4">
              <button
                className={`transition-transform duration-300 ease-in-out px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 active:shadow-md active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  selectedPane !== 'userInput' ? 'opacity-70' : 'scale-105'
                }`}
                onClick={() => setSelectedPane('userInput')}
              >
                Category
              </button>
              <button
                className={`transition-transform duration-300 ease-in-out px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 active:shadow-md active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedPane === 'userInput' ? 'opacity-70' : 'scale-105'
                }`}
                onClick={() => setSelectedPane('urlInput')}
              >
                Article
              </button>
            </div>
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
