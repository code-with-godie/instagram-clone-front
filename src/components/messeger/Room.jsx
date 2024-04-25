import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    cursor: pointer;
    :hover {
        background-color: #f2f2f2;
    }
`;
const ProfileContainer = styled.div`
    position: relative;
`;
const DescriptionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const UserName = styled.p`
    /* font-family: 'Poppins',sans-serif; */
    color: #000000c4;
    font-size: 0.9rem;
`;
const LastSeen = styled.p`
    font-size: 0.8rem;
    font-family: 'Poppins', sans-serif;
    color: #818181;
`;
const Online = styled.div`
    border-radius: 50%;
    padding: 0.4rem;
    background-color: #1ce21c;
    position: absolute;
    top: 4px;
    right: 8px;
    z-index: 100;
    transition: 100ms;
    visibility: hidden;
    &.show {
        visibility: visible;
    }
`;
const Room = ({ _id: roomID, changeConversation, members, setShowRooms }) => {
    const {
        user: { _id: loggedInUserID },
        onlineUsers,
    } = useAppContext();
    const friend = members?.find(member => member._id !== loggedInUserID);
    const [online, setOnline] = useState(
        onlineUsers?.some(user => user.id === friend?._id)
    );
    const handleClick = () => {
        setShowRooms(false);
        changeConversation({
            profilePic: friend?.profilePic,
            username: friend?.username,
            name: friend?.name,
            receiverID: friend?._id,
            roomID,
        });
    };
    useEffect(() => {
        setOnline(onlineUsers?.some(user => user.id === friend?._id));
    }, [onlineUsers]);
    return (
        <Container onClick={e => handleClick()}>
            <ProfileContainer>
                <IconButton className='profile'>
                    <Avatar
                        alt={friend?.username}
                        src={friend?.profilePic?.url}
                    />
                </IconButton>
                <Online className={`${online && 'show'}`} />
            </ProfileContainer>
            <DescriptionContainer>
                <UserName> {friend?.username} </UserName>
                <LastSeen>yesterday</LastSeen>
            </DescriptionContainer>
        </Container>
    );
};

export default Room;
