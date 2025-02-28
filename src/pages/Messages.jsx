import { NavLink, useParams } from 'react-router-dom';
import './Messages.css'
import { useContext, useEffect, useState } from 'react';
import { socketContext } from './MainLayout';
import axios from 'axios';

const formatMongoDate = (mongoDate) => {
    const date = new Date(mongoDate);
    const yy = date.getFullYear().toString().slice(-2);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
        
    return `${yy}/${mm}/${dd} ${hh}:${min}`;
};
function Messages({ withId }) {
    const [users, setUsers] = useState([]); // Initialize with empty array

    useEffect(() => {
        const get_users = async () => {
            try {
                const res = await axios.get('/user/get-users', {
                    withCredentials: true,
                });
                setUsers(res.data.users);
            } catch (err) {
                console.log(err);
            }
        }
        get_users();
    }, []);
    useEffect(() => {

    }, [users])

    return (
        <div className="messages-main-container">
            <aside className="messages-aside">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                <div className="chat-list-items">
                    {
                       users.map(user => (
                             <ChatListItem key={user._id} user={user} />
                            )
                        )
                    }
                </div>
            </aside>
            {withId ? <MessagesArea users={users} setUsers={ setUsers }/> : <EmptyMessagesArea />}
        </div>
    );
}

function ChatListItem({ user }) {
    return(
        <NavLink to={ '/main/messages/' + user._id} className={({isActive}) => isActive ? "active-chat-list-item" + " chat-list-item"  : "chat-list-item hover"}>
            <img className="picture" src='/user.jpg'/>            
            <p className="name">{user.name}</p>
            <p className="last-message">{ user.last_msg }</p>
            <p className="last-online-time">{ formatMongoDate(user.last_msg_time) }</p>
        </NavLink>
    )
}

function MessagesArea({ users, setUsers }) {
    // using the socket provided by the SocketContext
    const socket = useContext(socketContext);

    const receiverId = useParams().id;
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState(null);
    const [scroll, setScroll] = useState(false);

    socket.on('update_messages', (message) => {
        messages.push(message);
    })

    useEffect(() => {
        const feachMessagesAndUser = async () => {
            try {
                // getting all the messages between the user and his friend
                const res = await axios.post('/messages/get-messages', 
                    { receiverId: receiverId },
                    { withCredentials: true }
                );
                setMessages(res.data.messages);
                setReceiver(res.data.receiver);
            } catch (err) {
                console.log(err);
            }
        }
        feachMessagesAndUser();
    }, [receiverId, messages])

    useEffect(() => {
        const messages_container = document.getElementById('messages-area');
        messages_container.scrollTop= messages_container.scrollHeight;
        setScroll(false);
    }, [scroll])

    const sendMessage = () => { 
        if (socket && socket.connected) {
            const msg = document.getElementById('message-input').value;
            socket.emit('msg', { content: msg, receiverId: receiverId });
    
            // Update the users state with the new last message and timestamp
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user._id === receiverId 
                        ? { ...user, last_msg: msg, last_msg_time: new Date() } 
                        : user
                )
            );
            setScroll(true);
        } else {
            console.log('the socket is not connected');
        } 
    };
    return (
        <div className="messages-content">
            <div className="contact-preview">
                <img className="picture" src='/user.jpg'/>            
                <p className="name" id='receiver-name'>{ receiver && receiver.name }</p>
            </div>
            <div className="messages-area" id='messages-area'>
                <div className="messages">
                    {
                        messages.map(msg => ( msg &&
                            <ChatMessage key={ msg._id }
                                message={ msg.content }
                                timestamp={ formatMongoDate(msg.time) }
                                senderName= {receiver.name}
                                avatarUrl="/user.jpg"
                                isOutgoing={ msg.receiver === receiverId }
                                isGroupeChat={false}
                            />

                        ))
                    }
                </div>
            </div>
                <div className='message-input'>
                <textarea className="text-input" id='message-input' type='text' placeholder="type a message"/>
                    <button className="send" onClick={ sendMessage }><img className="send-logo" src="/send.svg"/></button>
                </div>
        </div>
    )
}

function ChatMessage({ message, timestamp, isOutgoing = false, avatarUrl, senderName, isGroupeChat }) {
    return (
        <div className={`message-container ${isOutgoing ? 'outgoing' : ''}`}>
            {!isOutgoing && <div className="avatar">
                <img src={avatarUrl} alt={`${senderName}'s avatar`} />
            </div>}

            <div className="message-content">
                {(isGroupeChat && !isOutgoing) && <span className="sender-name">{senderName}</span>}
                <div className="message-bubble">
                    <p className="message-text">{message}</p>
                    <span className="timestamp">{timestamp}</span>
                </div>
            </div>
        </div>
    );
};

function EmptyMessagesArea () {
    return (
        <div className="messages-content">
        </div>
    )
}
export default Messages;
