import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import LoginModal from './Components/LoginModal';
import Quiz from './Components/Quiz';
import { useGlobalContext } from './Components/context';
import Archives from './Components/Archives';
import { FaArchive } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeUser } = useGlobalContext();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [isArchives, setIsArchives] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="lg:m-5 mt-5 overflow-x-hidden overflow-y-scroll h-[80vh] bg-gray-50">
      <SignedOut>
        <div className="flex justify-between items-center py-4 px-6 bg-gray-50 shadow-sm rounded-lg ">
          <div className="font-bold text-3xl tracking-wide">QuizGPT</div>
          <button
            onClick={handleOpenModal}
            className="relative bg-transparent bg-gradient-to-r from-forest-green-600 to-forest-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all ease-in-out hover:opacity-90 hover:scale-105 duration-300"
          >
            Login
          </button>
          <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </SignedOut>
      <div>
        <SignedIn>
          <div className="flex justify-between items-center py-4 px-6 bg-gray-50 shadow-sm rounded-lg ">
            {activeUser && (
              <div className="font-bold text-2xl">
                <div className="text-blue-600">QuizGPT</div>
                <div className="text-gray-700 text-lg lg:text-xl">
                  Welcome back, {activeUser.firstName}!
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsArchives(!isArchives)}
                className="relative inline-flex items-center justify-center h-10 py-2 bg-transparent bg-gradient-to-r from-forest-green-600 to-forest-green-700 text-white font-semibold rounded-full shadow-sm transition-all duration-300 ease-in-out hover:bg-green-700 hover:text-white hover:px-4 px-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center">
                  {isArchives ? (
                    <FaArrowLeft
                      className={`transition-opacity duration-300 ${
                        isHovered ? 'opacity-0 hidden' : 'opacity-100'
                      }`}
                    />
                  ) : (
                    <FaArchive
                      className={`transition-opacity duration-300 ${
                        isHovered ? 'opacity-0 hidden' : 'opacity-100'
                      }`}
                    />
                  )}

                  <span
                    className={`transition-opacity ${
                      isHovered ? 'opacity-100 visible' : 'opacity-0 hidden'
                    }`}
                  >
                    {isArchives ? (
                      <div className="flex items-center justify-around gap-2">
                        <FaArrowLeft /> <p>Back</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-around gap-2">
                        <FaArchive /> <p>Previous Quizzes</p>
                      </div>
                    )}
                  </span>
                </div>
              </button>
              <div
                style={{ width: '50px', height: '50px' }}
                className="flex items-center justify-center"
              >
                <UserButton />
              </div>
            </div>
          </div>
        </SignedIn>

        <div className="flex justify-center ">
          {isArchives ? <Archives setIsArchives={setIsArchives} /> : <Quiz />}
        </div>
      </div>
    </main>
  );
};

export default App;
