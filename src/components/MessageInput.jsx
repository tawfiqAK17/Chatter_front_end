import { useContext, useEffect, useState } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';
import { socketContext } from '../layouts/MainLayout';

const MessageInput = ({ messages, setMessages, setContacts, activeContact }) => {

    const [message, setMessage] = useState('');

    const socket = useContext(socketContext);
    const sendMessage = () => { 
        if (socket && socket.connected) {
            socket.emit('msg', { content: message, receiverId: activeContact._id });
    
            // Update the users state with the new last message and timestamp
            setContacts(prevContacts => 
                prevContacts.map(contacts => 
                    contacts._id === activeContact._id 
                        ? { ...contacts, last_msg: message, last_msg_time: new Date() } 
                        : contacts
                )
            );
        } else {
            console.log('the socket is not connected');
        } 
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
        setMessage('');
    };

    return (
        <div className="bg-white border-t p-3">
            <form onSubmit={handleSubmit} className="flex items-center">
                <button
                    type="button"
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <FaPaperclip size={20} />
                </button>

                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border rounded-full py-2 px-4 mx-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    type="button"
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <FaSmile size={20} />
                </button>

                <button
                    type="submit"
                    className="ml-1 p-2 bg-secondary text-white rounded-full hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                    disabled={!message.trim()}
                >
                    <FaPaperPlane size={16} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
