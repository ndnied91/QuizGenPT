import { useEffect, useState } from 'react';
import QuizForm from './QuizForm';
import QuizQuestionnaire from './QuizQuestionnaire';
import Results from './Results';
import customFetch from '../utils/util';
import { useGlobalContext } from './context';
import QuizFromUrl from './QuizFromUrl';

const Quiz = () => {
  const { activeUser } = useGlobalContext();
  const [completed, setCompleted] = useState(false);
  const [answerKey, setAnswerKey] = useState([]);
  const { quiz, setQuiz, quizID } = useGlobalContext();

  const [selectedPane, setSelectedPane] = useState('userInput1');

  return (
    <>
      {completed ? (
        <div>
          <Results
            answerKey={answerKey}
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
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-4 justify-center w-full">
            <button
              className="bg-red-300 p-2 rounded shadow-lg cursor-pointer tracking-wider w-full"
              onClick={() => setSelectedPane('userInput')}
            >
              Category
            </button>
            <button
              className="bg-blue-300 p-2 rounded shadow-lg cursor-pointer tracking-wider w-full"
              onClick={() => setSelectedPane('urlInput')}
            >
              Article
            </button>
          </div>

          {selectedPane === 'userInput' ? <QuizForm /> : <QuizFromUrl />}
        </div>
      )}
    </>
  );
};

export default Quiz;
