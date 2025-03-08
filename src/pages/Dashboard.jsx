import React from 'react';
import { mockContacts, mockMessages } from '../data/mockData';

const Dashboard = () => {
  const sentMessages = mockMessages.filter(m => m.sender === 'me').length;
  const contactsCount = mockContacts.length;

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
        <p className="text-gray-600 mb-6">View your activity, manage your profile, and customize your settings.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">Messages</h3>
            <p className="text-2xl font-bold text-secondary">{sentMessages}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">Contacts</h3>
            <p className="text-2xl font-bold text-secondary">{contactsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;