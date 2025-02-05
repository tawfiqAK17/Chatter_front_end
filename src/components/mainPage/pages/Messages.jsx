import { NavLink } from 'react-router-dom';
import './Messages.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../../SocketContext';

function Messages() {
    const [users, setUsers] = useState([]);
    useEffect( () => {
        const get_users = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_SERVER_URL + '/user/get-users', {
                    withCredentials: true
                })
                setUsers(res.data.users);
            } catch (err) {
                 console.log(err);
            }
        }
        get_users();
    }, [])
    return (
        <div className="messages-main-container">
            <aside className="messages-aside">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                <div className="chat-list-items">
                    {
                        users.map(user => {return <ChatListItem key={user._id} user={user}/>})
                    }
                </div>
            </aside>
            <div className="messages-content">
                <div className="contact-preview">
                    <img className="picture" src='/user.jpg'/>            
                    <p className="name">name</p>
                </div>
                <MessagesArea />
            </div>
        </div>
    )
}

function ChatListItem({ user }) {
    return(
        <NavLink className="chat-list-item hover">
            <img className="picture" src='/user.jpg'/>            
            <p className="name">{user.name}</p>
            <p className="last-message">hello</p>
            <p className="last-online-time">10:00 pm</p>
        </NavLink>
    )
}

function MessagesArea() {
    // using the socket provided by the SocketContext
    const socket = useSocket();     

    const sendMessage = () => {
        if (socket && socket.connected) {
            const msg = document.getElementById('message-input').value;
            socket.emit('msg', msg);
        } 
    };
    return (
        <div className="messages-area">
            <div className="messages">
                <ChatMessage
                    message="Guyss tuktur depan kkantin ke japur!"
                    timestamp="05:05 PM"
                    senderName="Mas Happy"
                    avatarUrl="/user.jpg"
                    isOutgoing={false}
                />
                <ChatMessage
                    message="Woww siap mas teteh ulun cek"
                    timestamp="05:10 PM"
                    isOutgoing={true}
                />
            </div>
            <div className='input'>
                <textarea className="text-input" id='message-input' type='text' placeholder="type a message"/>
                <button className="send" onClick={ sendMessage }><img className="send-logo" src="/send.svg"/></button>
            </div>
        </div>
    )
}

function ChatMessage({ message, timestamp, isOutgoing = false, avatarUrl, senderName }) {
    return (
        <div className={`message-container ${isOutgoing ? 'outgoing' : ''}`}>
            {!isOutgoing && <div className="avatar">
                <img src={avatarUrl} alt={`${senderName}'s avatar`} />
            </div>}

            <div className="message-content">
                {!isOutgoing && <span className="sender-name">{senderName}</span>}
                <div className="message-bubble">
                    <p className="message-text">{message}</p>
                    <span className="timestamp">{timestamp}</span>
                </div>
            </div>
        </div>
    );
};

export default Messages;
