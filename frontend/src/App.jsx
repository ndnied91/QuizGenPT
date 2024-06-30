import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import LoginModal from './Components/LoginModal';
import Quiz from './Components/Quiz';

// const { user } = useClerk();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    setActiveUser(user);
  }, [user]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="m-10">
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

              <UserButton />
            </div>
          </div>
        </SignedIn>

        <div className="flex justify-center">
          <Quiz activeUser={activeUser} />
        </div>
      </div>
    </main>
  );
};

export default App;
