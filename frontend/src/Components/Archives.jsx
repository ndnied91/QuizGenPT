import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './context';
import customFetch from '../utils/util';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Archives = ({ setIsArchives }) => {
  const { archives, setArchives, activeUser, setQuiz, setQuizID } =
    useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [openTest, setOpenTest] = useState('');

  useEffect(() => {
    const getActiveQuiz = async () => {
      try {
        const { data } = await customFetch.get(`/archives/${activeUser.id}`);
        if (data) {
          setArchives(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (activeUser) getActiveQuiz();
  }, [activeUser]);

  const updateQuizStatus = async (item) => {
    console.log(item);
    try {
      const response = await customFetch.post(`/quiz/${item._id}`, {
        user: activeUser.id,
        to_update: { is_active: true },
      });

      if (response.status === 200) {
        setQuiz(item.quiz);
        setQuizID({ _id: item._id, user: item.user });
        setIsArchives(false);
      } else {
        console.log('Update failed');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen h-fit">
      <div className="text-xl font-bold">Archives</div>
      <div className="h-1/2 overflow-scroll bg-blue-100">
        {archives.map((item) => {
          const isOpen = openTest === item._id;
          return (
            <div key={item._id} className="m-2">
              <div
                className={`bg-gray-100 w-full cursor-pointer shadow-md duration-300 ${
                  isOpen ? 'h-36' : 'h-14'
                }`}
                onClick={() => setOpenTest(isOpen ? null : item._id)}
                style={{
                  transition: 'height 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <div className={`flex justify-between pl-2 pr-2 mt-2 `}>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      {isOpen ? <FaArrowUp /> : <FaArrowDown />}

                      {item.quiz[0].question}
                    </div>
                  </div>
                  <div
                    className="bg-blue-300 w-fit p-2 rounded-md shadow"
                    onClick={() => updateQuizStatus(item)}
                  >
                    Retake
                  </div>
                </div>
                {isOpen && (
                  <div className="ml-4">
                    {item.quiz[0].answers.map((answer, index) => (
                      <p key={answer}>
                        {String.fromCharCode(65 + index)}. {answer}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archives;
