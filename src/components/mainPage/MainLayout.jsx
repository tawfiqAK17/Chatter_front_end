import { NavLink, Outlet } from 'react-router-dom';
import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import './MainLayout.css'

export const socketContext = createContext();

function MainLayout() {
    // connecting the websocket to the server
    const [socket, setSocket] = useState( io(import.meta.env.VITE_SERVER_URL,
        {
            transports: ["websocket"],
            withCredentials: true,
        })
    );

    useEffect(() => {
        // after each refresh the socket will be reinitialized if it is not connected any more
        if (!socket.connected) {
            setSocket(io(import.meta.env.VITE_SERVER_URL, {
                transports: ["websocket"],
                    withCredentials: true,
            }));
        }
    }, []);
    return (
        <div className="main-layout">
            <aside className='aside'>
                <div className="logo"><img src='/logo.png' alt='logo' /></div>
                <div className="elements">
                    <AsideElement icon="/message.svg" label="Messages" destination_path="/main/messages"></AsideElement>
                </div>
                <User />
            </aside>
            <div className="content">
                <socketContext.Provider value={ socket }>
                    <Outlet />
                </socketContext.Provider>
            </div>
        </div>
    )
}
function AsideElement({ icon, label, destination_path }) {
    return (
        <NavLink className={({isActive}) => isActive ? "active-aside-element " + "aside-element"  : "aside-element"} to={destination_path} end={false}>
            <img className="aside-element-icon" src={icon} alt='icon' style={{width:'28px'}}/>
            <p className="aside-element-label">{label}</p>
        </NavLink>
   )
}

function User() {
    return (
        <NavLink className="user" to="/main/account">
            <img className="profile-picture" src='/user.jpg'/>            
            <p className="user-name">Name</p>
            <p className="logout">Logout</p>
        </NavLink>
    )
}
export default MainLayout;
