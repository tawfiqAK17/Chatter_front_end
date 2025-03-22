import { useContext, useEffect, useState } from 'react';
import { FaBell, FaLock, FaPalette, FaUser } from 'react-icons/fa';
import { userContext } from '../layouts/MainLayout';
import ToggleButton from '../components/ToggleButton';
import { document } from 'postcss';

const Settings = () => {
    const { user, setUser } = useContext(userContext);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
            if (typeof window != 'undefined') {
                const newMode = !darkMode;
                setDarkMode(!darkMode);
                if (newMode) {
                    window.document.documentElement.classList.add('dark');
                } else {
                    window.document.documentElement.classList.remove('dark');
                }
            }
    };
    useEffect(() => {
        if(typeof window != 'undefined') {
            if (window.document.documentElement.classList.contains('dark')) 
                setDarkMode(true);
        }
    })

    return (
        user && 
        <div className="flex-1 bg-gray-50 dark:bg-dark-primary p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-darkText-primary mb-6">Settings</h1>

                {/* Profile Section */}
                <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center mb-6">
                        <FaUser className="text-secondary text-xl mr-3" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-darkText-secondary">Profile</h2>
                    </div>

                    <div className="flex items-center mb-6">
                        <div className="relative">
                            <img
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full hover:bg-secondary-dark transition-colors">
                                <FaUser size={12} />
                            </button>
                        </div>
                        <div className="ml-6">
                            <h3 className="font-medium text-gray-800 dark:text-darkText-secondary">{ user.name }</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{ user.email }</p>
                        </div>
                    </div>

                </div>

                {/* Appearance */}
                <div className=" flex justify-between bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6">
                    <div>
                        <div className="flex items-center mb-6">
                            <FaPalette className="text-secondary text-xl mr-3" />
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-darkText-secondary">Appearance</h2>
                        </div>
                        <div className="ml-6">
                            <h3 className="font-medium text-gray-800 dark:text-darkText-secondary">Dark Mode</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">switch to dark mode theme</p>
                        </div>
                    </div>
                    <div className='self-center'>
                        <ToggleButton onClick={ toggleDarkMode } state={ darkMode } />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
