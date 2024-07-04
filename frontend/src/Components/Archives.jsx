import React, { useEffect } from 'react';
import { useGlobalContext } from './context';
import customFetch from '../utils/util';

const Archives = () => {
  const { archives, setArchives, activeUser } = useGlobalContext();

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

  console.log(archives);
  return (
    <div className="w-screen h-fit">
      <div className="text-xl font-bold">Archives</div>

      <div className="h-1/2 overflow-scroll bg-blue-100">
        {archives.map((item) => (
          <div className="">
            <div
              key={item._id}
              className="bg-gray-100 m-2 p-2 cursor-pointer shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>{item.quiz[0].question}</div>
                <div className="bg-blue-300 w-fit p-2 rounded-md shadow">
                  {' '}
                  Retake
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archives;
