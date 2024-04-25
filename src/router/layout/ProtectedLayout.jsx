import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { io } from 'socket.io-client';

const Container = styled.main`
    height: 100vh;
    overflow: auto;
    background: ${props => props.theme.bg_primary};
    color: ${props => props.theme.text_primary};
    *::-webkit-scrollbar-thumb {
        background: ${props => props.darkMode && 'white'};
        cursor: pointer;
    }
    *::-webkit-scrollbar-track {
        box-shadow: ${props => props.darkMode && 'inset 0 0 5px white'};
        border-radius: 10px;
    }
    @media screen and (max-width: 768px) {
        *::-webkit-scrollbar-track {
            box-shadow: none;
        }
        *::-webkit-scrollbar-thumb {
            display: none;
        }
    }
`;
const ProtectedLayout = () => {
    const { darkMode, user, updateSocket, socket, updateOnlineUsers } =
        useAppContext();
    const sendDetails = () => {
        socket?.emit('ADD_USER', user._id);
    };
    useEffect(() => {
        if (user) {
            const socket = io(process.env.REACT_APP_SOCKET_URL);
            updateSocket(socket);
        }
    }, [user]);
    useEffect(() => {
        socket?.on('SEND_DETAILS', sendDetails);
        socket?.on('GET_ONLINE_USERS', onlineUsers => {
            updateOnlineUsers(onlineUsers);
        });
        return () => {
            socket?.off('SEND_DETAILS', sendDetails);
        };
    }, [socket]);
    return (
        <Container darkMode={darkMode}>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </Container>
    );
};

export default ProtectedLayout;
