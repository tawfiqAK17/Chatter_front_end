import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Messages from './pages/Messages';
import Communities from './pages/Communities';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const routes = [
  {
    path: '/',
    element: <Login /> 
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'messages',
        element: <Messages />
      },
      {
        path: 'communities',
        element: <Communities />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'chat',
        element: <Messages ></Messages> 
        }
    ]
  }
];

export default routes;
