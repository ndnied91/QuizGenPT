import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { IoCloseSharp } from 'react-icons/io5';
import OutsideClickHandler from 'react-outside-click-handler';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="bg-white rounded-lg shadow-lg pt-6 w-max">
          <div className="flex justify-end mr-8">
            <IoCloseSharp
              className="text-3xl cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
                  cardBox: 'shadow-none',
                  card: 'border-t-none',
                },
              }}
            />
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default LoginModal;
