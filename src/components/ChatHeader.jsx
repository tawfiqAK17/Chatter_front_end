import { FaBars, FaEllipsisV, FaPhone, FaVideo } from 'react-icons/fa';

const ChatHeader = ({ contact, toggleMobileMenu }) => {
  return (
    <div className="bg-white border-b p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-3 text-gray-500 hover:text-gray-700"
          onClick={toggleMobileMenu}
        >
          <FaBars size={20} />
        </button>
        
        <div className="flex items-center">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-xs text-gray-500">
              {contact.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <FaPhone />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <FaVideo />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
