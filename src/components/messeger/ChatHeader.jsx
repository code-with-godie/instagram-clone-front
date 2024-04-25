import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdCall } from 'react-icons/md';
import { FiVideo } from 'react-icons/fi';
import { ImInfo } from 'react-icons/im';
import { useAppContext } from '../../context/AppContext';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid #dbdbdb;
`;

const ProfileContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  .back {
    font-size: 1.5rem;
    cursor: pointer;
    @media screen and (min-width: 525px) {
      display: none;
    }
  }
`;
const ProfileDescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 525px) {
    gap: 0.5rem;
  }
`;
const UserName = styled.h4`
  color: #000000dd;
`;
const LastSeen = styled.p`
  font-size: 0.8rem;
  color: #a9a7a7;
  &.online {
    color: #1ce21c;
  }
`;
const ChatHeader = ({ username, profilePic, receiverID, setShowRooms }) => {
  const { onlineUsers } = useAppContext();
  const [online, setOnline] = useState(
    onlineUsers?.some(user => user.id === receiverID)
  );
  useEffect(() => {
    setOnline(onlineUsers?.some(user => user.id === receiverID));
  }, [onlineUsers, receiverID]);
  return (
    <Container>
      <ProfileContainer>
        <IconButton onClick={() => setShowRooms(true)}>
          <AiOutlineArrowLeft className='back' />
        </IconButton>
        <IconButton>
          <Avatar
            alt={username}
            src={profilePic?.url}
          />
        </IconButton>
        <ProfileDescriptionContainer>
          <UserName> {username} </UserName>
          <LastSeen className={`${online && 'online'}`}>
            {online ? 'online' : 'offline'}
          </LastSeen>
        </ProfileDescriptionContainer>
      </ProfileContainer>
      <IconContainer>
        <IconButton>
          {' '}
          <MdCall />{' '}
        </IconButton>
        <IconButton>
          {' '}
          <FiVideo />{' '}
        </IconButton>
        <IconButton>
          {' '}
          <ImInfo />{' '}
        </IconButton>
      </IconContainer>
    </Container>
  );
};

export default ChatHeader;
