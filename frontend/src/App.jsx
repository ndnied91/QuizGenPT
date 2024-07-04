import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import LoginModal from './Components/LoginModal';
import Quiz from './Components/Quiz';
import { useGlobalContext } from './Components/context';
import Archives from './Components/Archives';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeUser } = useGlobalContext();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [isArchives, setIsArchives] = useState(false);

  return (
    <main className="m-10 overflow-x-hidden overflow-y-scroll h-[80vh]">
      <SignedOut>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-end cursor-pointer "
        >
          Login
        </button>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </SignedOut>
      <div>
        <SignedIn>
          <div>
            <div className="flex justify-between">
              {activeUser && (
                <p className="font-bold text-2xl mb-10">
                  Welcome back {activeUser.firstName}!
                </p>
              )}

              <div className="flex items-center gap-1 h-max">
                <button
                  onClick={() => setIsArchives(!isArchives)}
                  className="bg-green-500 rounded-lg p-1 text-sm pl-3 pr-3 shadow-md cursor-pointer"
                >
                  {isArchives ? 'Back to Quiz' : 'Previous Quizzes'}
                </button>
                <UserButton />
              </div>
            </div>
          </div>
        </SignedIn>

        <div className="flex justify-center overflow-y-scroll">
          {isArchives ? <Archives setIsArchives={setIsArchives} /> : <Quiz />}
        </div>
      </div>
    </main>
  );
};

export default App;
