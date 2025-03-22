import { FaComment, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

const MainSidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    {
      id: 'chat',
      label: 'Chat',
      icon: <FaComment />,
    },
    {
      id: 'communities',
      label: 'Communities',
      icon: <FaUsers />,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaChartBar />,
    },
  ];

  return (
    <div className="w-20 bg-primary flex flex-col items-center py-6 shadow-md">
      
      {/* Navigation Items */}
      <div className="flex-1 flex flex-col items-center space-y-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-12 h-12  rounded-xl flex items-center justify-center transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-secondary dark:bg-darkMessage-user text-white'
                : 'text-gray-400 hover:text-white hover:bg-primary-light'
            }`}
            onClick={() => setActiveSection(item.id)}
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
          </button>
        ))}
      </div>
      
      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center space-y-4">
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-light transition-all duration-200"
          title="Settings"
        >
          <FaCog className="text-xl" />
        </button>
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-light transition-all duration-200"
          title="Logout"
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
