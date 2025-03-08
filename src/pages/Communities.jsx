import React from 'react';

const Communities = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Communities</h2>
        <p className="text-gray-600 mb-6">Join or create communities to connect with people who share your interests.</p>
        <button className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition duration-200">
          Explore Communities
        </button>
      </div>
    </div>
  );
};

export default Communities;