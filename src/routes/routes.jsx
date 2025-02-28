import MainLayout from "../pages/MainLayout";
import Messages from "../pages/Messages";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedRout from "./protected_route";

export const routesData = [
    {
        path: '/sign-in',
        element: <SignIn />,
        title: "Sign In"
    },
    {
        path: '/sign-up',
        element: <SignUp />,
        title: "Sign In"
    },
    {
        path: '/main',
        element: <ProtectedRout children={ <MainLayout /> }/>,
        title: "main",
        children: [
            {
                path: 'dashboard',
                element: <MainLayout />,
                title: "dashboard",
            },
            {
                path: 'messages',
                element: <Messages withId={ false }/>,
                title: "messages",
            },
            {
                path: 'messages/:id',
                element: <Messages withId={ true }/>,
                title: "messages",
            },
            {
                path: 'communities',
                element: <MainLayout />,
                title: "communities",
            },
            {
                path: 'calls',
                element: <MainLayout />,
                title: "calls",
            },
            {
                path: 'files',
                element: <MainLayout />,
                title: "files",
            },
            {
                path: 'settings',
                element: <MainLayout />,
                title: "settings",
            },
        ]
    }
]
