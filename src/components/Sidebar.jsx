import { useState } from 'react';
import { format } from 'date-fns';
import { FaSearch, FaTimes } from 'react-icons/fa';
import userImg from '../public/user.jpg'

const Sidebar = ({ contacts, activeContact, setActiveContact, closeMobileMenu }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleContactClick = (contact) => {
        setActiveContact(contact);
        // save the active contact in the session storage
        sessionStorage.setItem('activeContact', JSON.stringify(contact));
        closeMobileMenu();
    }; 

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b dark:border-darkInput-border flex items-center justify-between h-16">
                <h1 className="text-xl font-bold text-primary dark:text-darkText-secondary">Chats</h1>
                <button 
                    className="md:hidden text-gray-500 dark:text-darkText-secondary hover:text-gray-700 dark:hover:text-darkText-primary"
                    onClick={closeMobileMenu}
                >
                    <FaTimes size={20} />
                </button>
            </div>

            <div className="p-3 border-b dark:border-darkInput-border">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-primary-light dark:text-darkText-primary focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-darkInput-border"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                        <div
                            key={contact._id}
                            className={`flex items-center p-3 border-b dark:border-darkInput-border cursor-pointer hover:bg-gray-50 dark:hover:bg-darkChat-hover ${
activeContact && activeContact._id === contact._id ? 'bg-blue-50 dark:bg-darkChat-active' : ''
}`}
                            onClick={() => handleContactClick(contact)}
                        >
                            <div className="relative">
                                <img
                                    src={userImg}
                                    alt={contact.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-gray-900 dark:text-darkText-primary">{contact.name}</h3>
                                    <span className="text-xs text-gray-500 dark:text-darkText-secondary">{format(new Date(contact.last_msg_time), 'h:mm a')}</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-darkText-secondary truncate">{contact.last_msg}</p>
                            </div>
                        </div>
                    ))
                ) : (
                        <div className="p-4 text-center text-gray-500">No contacts found</div>
                    )}
            </div>
        </div>
    );
};

export default Sidebar;
