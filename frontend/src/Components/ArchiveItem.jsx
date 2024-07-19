import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaTrashAlt, FaRedo } from 'react-icons/fa';
import { transformDate } from '../utils/supportFuncs';

const ArchiveItem = ({
  updateQuizStatus,
  deleteItem,
  openTest,
  setOpenTest,
  ...item
}) => {
  // const [openTest, setOpenTest] = useState('');
  const quizLength = item.quiz.length;
  const isOpen = openTest === item._id;
  const date = item.timestamp;

  return (
    <div key={item._id} className="m-2">
      <div
        className={`bg-slate-100 w-full cursor-pointer pb-2 shadow-md flex flex-col hover:bg-slate-200 h-fit`}
        onClick={() => setOpenTest(isOpen ? null : item._id)}
      >
        <div className={`flex justify-between items-center pl-2 pr-2 mt-2`}>
          <div className="flex items-center gap-2">
            {isOpen ? <FaArrowUp /> : <FaArrowDown />}
            <p className="text-xs text-grey-300 lg:text-md">
              {item?.quiz[0]?.question}
            </p>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block text-xs italic text-gray-800">
              {transformDate(date)}
            </div>
            <div
              className="text-sm ml-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold flex items-center px-2 rounded-md shadow-md hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 h-8"
              onClick={() => updateQuizStatus(item)}
            >
              <FaRedo />
            </div>
            <div
              className="text-sm ml-2 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold flex items-center px-2 rounded-md shadow-md hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 h-8"
              onClick={() => deleteItem(item)}
            >
              <FaTrashAlt />
            </div>
          </div>
        </div>
        <section>
          {isOpen && (
            <>
              <div className="ml-8">
                <p className="w-fit md:hidden sm:block text-xs pt-2 pb-2 text-red-600 italic">
                  Created: {transformDate(date)}
                </p>
                <p className="text-xs italic mb-3 text-gray-800">
                  {quizLength > 1
                    ? 'Additional questions'
                    : 'No other questions'}
                </p>

                {item?.quiz?.map((item, index) => {
                  if (index > 0) {
                    return (
                      <div key={index}>
                        <p key={index} className="text-xs m-2 ml-0">
                          <span className="mr-1">{index + 1}.</span>
                          <span>{item.question}</span>
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ArchiveItem;
