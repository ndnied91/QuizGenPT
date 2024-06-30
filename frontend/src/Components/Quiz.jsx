import { useEffect, useState } from 'react';
import QuizForm from './QuizForm';
import QuizQuestionnaire from './QuizQuestionnaire';
import Results from './Results';
import customFetch from '../utils/util';

const Quiz = ({ activeUser }) => {
  const [quiz, setQuiz] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [answerKey, setAnswerKey] = useState([]);
  console.log(answerKey);

  // const testData = [
  //   {
  //     question: "What is the most abundant gas in Earth's atmosphere?",
  //     answers: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'],
  //     correctAnswer: 'Oxygen',
  //     url: 'https://www.nationalgeographic.org/encyclopedia/earth-atmosphere/',
  //   },
  //   {
  //     question: "Which layer of the Earth's atmosphere do we live in?",
  //     answers: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
  //     correctAnswer: 'Mesosphere',
  //     url: 'https://www.britannica.com/science/troposphere',
  //   },
  //   {
  //     question: "What causes the Earth's seasons?",
  //     answers: [
  //       "The tilt of the Earth's axis",
  //       'The distance from the Sun',
  //       "The Earth's orbit shape",
  //       "The Moon's position",
  //     ],
  //     correctAnswer: "The tilt of the Earth's axis",
  //     url: 'https://earthsky.org/earth/what-causes-the-seasons/',
  //   },
  // ];

  useEffect(() => {
    const getActiveQuiz = async () => {
      console.log(activeUser);
      try {
        const { data } = await customFetch.get(
          `/quiz?user=${encodeURIComponent(activeUser?.id)}`
        );
        if (data) {
          console.log(data);

          setQuiz(data.quiz);
        }
      } catch (e) {
        // console.log(e);
        // setCaughtComponent(true);
      }
    };
    if (activeUser) getActiveQuiz();
  }, [activeUser]);

  return (
    <div className="">
      {completed ? (
        <div>
          {' '}
          <Results answerKey={answerKey} setCompleted={setCompleted} />
        </div>
      ) : quiz?.length >= 1 ? (
        <QuizQuestionnaire
          quiz={quiz}
          setCompleted={setCompleted}
          setAnswerKey={setAnswerKey}
        />
      ) : (
        <QuizForm setQuiz={setQuiz} activeUser={activeUser} />
      )}
    </div>
  );
};

export default Quiz;
