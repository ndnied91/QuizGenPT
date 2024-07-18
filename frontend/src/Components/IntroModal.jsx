const IntroModal = ({ isInfoModalOpen, setIsInfoModalOpen }) => {
  if (!isInfoModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Please review!</h2>
        <p className="mb-4">
          The first request can take up to a minute due to the server spinning
          up. Thank you for your patience.
        </p>
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          onClick={() => setIsInfoModalOpen(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default IntroModal;
