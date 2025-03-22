import { useState, useEffect } from 'react';
import Axios from '../axios.config';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const Messages = () => {
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeContact, setActiveContact] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const get_users = async () => {
            try {
                const res = await Axios.get('/user/get-users');
                setContacts(res.data.users);
            } catch (err) {
                console.log(err);
            }
        }
        get_users();
    }, []);
    useEffect(() => {
        const savedAciveContact = sessionStorage.getItem('activeContact');
        if (savedAciveContact) {
            setActiveContact(contacts.find(constact => constact._id === JSON.parse(savedAciveContact)._id));
        }
    }, [contacts])

    // make sure the active contact is the same before the refresh
    useEffect(() => {
    }, [activeContact]);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    return (
        <>
            {/* Contacts Sidebar - hidden on mobile unless toggled */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-80 bg-white dark:bg-dark-primary shadow-md z-10`}>
                <Sidebar 
                    contacts={contacts.map(contact => {
                        return {...contact, avatar: "", } 
                    })} 
                    activeContact={activeContact} 
                    setActiveContact={setActiveContact}
                    closeMobileMenu={() => setIsMobileMenuOpen(false)}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {
                    activeContact &&
                        <ChatHeader 
                            contact={activeContact} 
                            toggleMobileMenu={toggleMobileMenu}
                        />
                }

                <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-dark-secondary p-4">
                    { activeContact &&
                        <MessageList 
                            messages={messages}
                            setMessages={setMessages}
                            activeContact={activeContact}
                        />
                    }

                </div>

                { activeContact && 
                    <MessageInput 
                        activeContact={activeContact}
                        setContacts={setContacts}
                    />
                }
            </div>
        </>
    );
};

export default Messages;
