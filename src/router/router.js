import { createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from './layout/ProtectedLayout';
import AuthLayout from './layout/AuthLayout';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Messeger from '../pages/messeger/Messeger';
import Reels from '../pages/reels/Reels';
import SinglePost from '../pages/single/SinglePost';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/profile/:username',
                element: <Profile />,
            },
            {
                path: '/direct/inbox',
                element: <Messeger />,
            },
            {
                path: '/reels',
                element: <Reels />,
            },
            {
                path: '/p/:postID',
                element: <SinglePost />,
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },
]);
