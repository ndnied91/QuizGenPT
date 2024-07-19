import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './context';
import customFetch from '../utils/util';
import { FaArrowDown, FaArrowUp, FaTrashAlt, FaRedo } from 'react-icons/fa';
import { transformDate } from '../utils/supportFuncs';
import ArchiveItem from './ArchiveItem';

const Archives = ({ setIsArchives }) => {
  const [openTest, setOpenTest] = useState('');
  const { archives, setArchives, activeUser, setQuiz, setQuizID } =
    useGlobalContext();

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
    <div className="w-screen h-fit m-4">
      <div className="text-xl font-bold ml-2">Archives</div>
      <div className="h-1/2 overflow-scroll ">
        {archives.map((item, index) => {
          return (
            <ArchiveItem
              key={index}
              updateQuizStatus={updateQuizStatus}
              deleteItem={deleteItem}
              openTest={openTest}
              setOpenTest={setOpenTest}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Archives;
