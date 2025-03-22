import Axios from '../axios.config';
import { format } from 'date-fns';
import { useContext, useEffect, useRef } from 'react';
import { userContext } from '../layouts/MainLayout';
import { socketContext } from '../layouts/MainLayout';

const MessageList = ( {messages, setMessages, activeContact} ) => {
    const formatMessageTime = (timestamp) => {
        return format(new Date(timestamp), 'h:mm a');
    };
    const {user, setUser} = useContext(userContext);

    const socket = useContext(socketContext);

    useEffect(() => {
      const handleUpdateMessages = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      };
      
      socket.on('update_messages', handleUpdateMessages);
      
      // Clean up function to remove the listener when component unmounts
      return () => {
        socket.off('update_messages', handleUpdateMessages);
      };
    }, [socket]); // Only depend on socket, not messages

    useEffect(() => {
        const get_messages = async () => {
            try {
                // getting all the messages between the user and his friend
                const res = await Axios.post('/messages/get-messages',  
                    { receiverId: activeContact._id });
                setMessages(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        }
        get_messages();
    }, [activeContact]);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-full overflow-y-auto px-4 py-2">
            {messages.map((message) => {
                const outgoing = message.sender === user._id;
                return (
                    <div
                        key={message._id}
                        className={`flex mb-4 ${outgoing ? 'justify-end' : 'justify-start'}`}
                    >
                        {!outgoing && (
                            <div className="mr-2 flex-shrink-0">
                                <img
                                    src={activeContact.avatar}
                                    alt={activeContact.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </div>
                        )}

                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
outgoing ?
'bg-secondary dark:bg-darkMessage-user text-white dark:text-darkText-primary rounded-br-none'
: 'bg-white dark:bg-darkMessage-contact text-gray-800 dark:text-darkText-primary rounded-bl-none shadow'
}`}
                        >
                            <p>{message.content}</p>
                            <div
                                className={`text-xs mt-1 ${
outgoing ? 'text-blue-100 dark:text-darkText-secondary' : 'text-gray-500 dark:text-darkText-secondary'
}`}
                            >
                                {formatMessageTime(message.time)}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
