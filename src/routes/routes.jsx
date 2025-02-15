import MainLayout from "../components/mainPage/MainLayout";
import Messages from "../components/mainPage/pages/Messages";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
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
        element: <ProtectedRout child={ <MainLayout /> }/>,
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
                path: 'community',
                element: <MainLayout />,
                title: "community",
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
