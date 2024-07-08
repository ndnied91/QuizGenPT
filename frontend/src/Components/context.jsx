import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import customFetch from '../utils/util';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useUser();
  // const [items, setItems] = useState([]); //main todos
  const [activeUser, setActiveUser] = useState();
  const [quiz, setQuiz] = useState();
  const [quizID, setQuizID] = useState('');
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    setActiveUser(user);
  }, [user]);

  useEffect(() => {
    const getActiveQuiz = async () => {
      try {
        const { data } = await customFetch.get(
          `/quiz?user=${encodeURIComponent(activeUser?.id)}`
        );
        console.log(data);
        if (data) {
          setQuizID({ _id: data._id, user: data.user });
          setQuiz(data.quiz);
        }
      } catch (e) {}
    };
    if (activeUser) getActiveQuiz();
  }, [activeUser]);

  return (
    <AppContext.Provider
      value={{
        // items,
        activeUser,
        quiz,
        setQuiz,
        quizID,
        setQuizID,
        archives,
        setArchives,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
