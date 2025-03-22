import { FaComment, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import Axios from '../axios.config';

export const socketContext = createContext();

export const userContext = createContext();

const MainLayout = () => {
    // the user state
    const [user, setUser] = useState(null);

    // connecting the websocket to the server
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await Axios.get('/user/get-user', {
                    
                });
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        }
        // after each refresh the socket will be reinitialized if it is not connected any more
        if (!socket || !socket.connected) {
            setSocket(io(import.meta.env.VITE_SERVER_URL,
                {
                    auth: {
                        token: "Baerer " + sessionStorage.getItem('jwt').replaceAll('"', ''),
                    },
                    transports: ["websocket"],
                })
            );
        }
        // fetch the user
        getUser();
    }, []);

    const navItems = [
        {
            id: 'chat',
            path: '/chat',
            label: 'Chat',
            icon: <FaComment />,
        },
        {
            id: 'communities',
            path: '/communities',
            label: 'Communities',
            icon: <FaUsers />,
        },
        {
            id: 'dashboard',
            path: '/dashboard',
            label: 'Dashboard',
            icon: <FaChartBar />,
        },
    ];

    return (
        <socketContext.Provider value={socket}>
            <div className="flex h-screen bg-gray-100">
                {/* Main Navigation Sidebar */}
                <div className="w-20 bg-primary dark:bg-darkSidebar-background flex flex-col items-center py-6 shadow-md">
                    {/* App Logo */}
                    <div className="mb-10">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                            <FaComment className="text-white text-xl" />
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 flex flex-col items-center space-y-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) => `w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 
${isActive ? 'bg-secondary text-white dark:bg-darkSidebar-activeItem' : 'text-gray-400 hover:text-white hover:bg-primary-light'} `
                                }
                                title={item.label}
                            >
                                <span className="text-xl">{item.icon}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-auto flex flex-col items-center space-y-4">
                        <NavLink
                            to="/settings"
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-light transition-all duration-200"
                            title="Settings"
                        >
                            <FaCog className="text-xl" />
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-light transition-all duration-200"
                            title="Logout"
                        >
                            <FaSignOutAlt className="text-xl" />
                        </NavLink>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    <userContext.Provider value={ { user, setUser } }>
                        <Outlet />
                    </userContext.Provider>
                </div>
            </div>
        </socketContext.Provider>
    );
};

export default MainLayout;
