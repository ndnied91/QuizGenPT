import React, { useEffect, useState } from 'react';
import { jokes } from '../utils/util';

const Jokes = () => {
  const [jokeIndex, setJokeIndex] = useState(null);
  const [showJoke, setShowJoke] = useState(true);
  const [showAnswer, setShowAnswer] = useState(true);

  const tellAJoke = () => {
    const index = Math.floor(Math.random() * 40);
    setJokeIndex(index);
    setShowAnswer(false);

    setTimeout(() => {
      setShowAnswer(true);
    }, 3000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      tellAJoke();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center text-green-800 ">
      <div className={`font-bold text-sm fade-in ${showJoke ? 'visible' : ''}`}>
        {jokeIndex !== null && jokes[jokeIndex].joke}
      </div>
      <div className={`text-sm fade-in ${showAnswer ? 'visible' : ''}`}>
        {showAnswer && jokeIndex !== null && jokes[jokeIndex].answer}
      </div>
    </div>
  );
};

export default Jokes;
