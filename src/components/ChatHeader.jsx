import { FaBars, FaEllipsisV, FaPhone, FaVideo } from 'react-icons/fa';
import userImg from '../public/user.jpg'

const ChatHeader = ({ contact, toggleMobileMenu }) => {
  return (
    <div className="bg-white dark:bg-dark-primary border-b dark:border-darkInput-border p-3 flex items-center justify-between shadow-sm h-16">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-3 text-gray-500 dark:text-darkText-secondary hover:text-gray-700 dark:hover:text-darkText-primary"
          onClick={toggleMobileMenu}
        >
          <FaBars size={20} />
        </button>
        
        <div className="flex items-center">
          <div className="relative">
            <img
              src={userImg}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3">
            <h2 className="font-medium dark:text-darkText-primary">{contact.name}</h2>
            <p className="text-xs text-gray-500 dark:text-darkText-secondary">
              {contact.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full dark:hover:text-darkText-primary text-gray-600">
          <FaPhone />
        </button>
        <button className="p-2 rounded-full dark:hover:text-darkText-primary text-gray-600">
          <FaVideo />
        </button>
        <button className="p-2 rounded-full dark:hover:text-darkText-primary text-gray-600">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
