import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './context';
import customFetch from '../utils/util';
import { FaArrowDown, FaArrowUp, FaTrashAlt } from 'react-icons/fa';

const Archives = ({ setIsArchives }) => {
  const { archives, setArchives, activeUser, setQuiz, setQuizID } =
    useGlobalContext();

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

  const deleteItem = async (item) => {
    try {
      const response = await customFetch.delete(
        `/quiz/${item._id}?user=${activeUser.id}`
      );

      if (response.status === 200) {
        setArchives(archives.filter((quiz) => quiz !== item));
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
      <div className="h-1/2 overflow-scroll ">
        {archives.map((item) => {
          const isOpen = openTest === item._id;
          return (
            <div key={item._id} className="m-2">
              <div
                className={`bg-gray-100 w-full cursor-pointer shadow-md duration-300 ${
                  isOpen ? 'h-24' : 'h-14'
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

                      <p className="text-xs lg:text-md">
                        {item?.quiz[0]?.question}
                      </p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex">
                    <div
                      className="text-sm ml-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold flex items-center px-2 rounded-md shadow-md hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 h-8"
                      onClick={() => updateQuizStatus(item)}
                    >
                      Retake
                    </div>
                    {/*  */}
                    <div
                      className="text-sm ml-2 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold flex items-center px-2 rounded-md shadow-md hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 h-8"
                      onClick={() => deleteItem(item)}
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                  {/*  */}
                </div>
                {isOpen && (
                  <div className="ml-4 text-xs lg:text-md">
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
