import { useEffect, useState } from 'react';
import QuizForm from './QuizForm';
import QuizQuestionnaire from './QuizQuestionnaire';
import Results from './Results';
import customFetch from '../utils/util';
import { useGlobalContext } from './context';

const Quiz = () => {
  const { activeUser } = useGlobalContext();
  const [completed, setCompleted] = useState(false);
  const [answerKey, setAnswerKey] = useState([]);

  const { quiz, setQuiz, quizID } = useGlobalContext();

  return (
    <>
      {completed ? (
        <div>
          {' '}
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
        <QuizForm />
      )}
    </>
  );
};

export default Quiz;
