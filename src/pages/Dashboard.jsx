import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-primary">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-darkText-primary">Dashboard</h2>
        <p className="text-gray-600 mb-6 dark:text-darkText-secondary">View your activity, manage your profile, and customize your settings.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-primary-dark">
            <h3 className="font-medium text-gray-800 dark:text-darkText-primary">Messages</h3>
            <p className="text-2xl font-bold text-secondary ">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm  dark:bg-primary-dark">
            <h3 className="font-medium text-gray-800 dark:text-darkText-primary">Contacts</h3>
            <p className="text-2xl font-bold text-secondary">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
