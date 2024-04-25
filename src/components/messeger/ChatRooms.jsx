import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Room from './Room';
import { useAppContext } from '../../context/AppContext';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  gap: 0.5rem;
  .icon {
    font-size: 1.5rem;
    color: #000000ce;
    cursor: pointer;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const TitleContaineer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  flex: 1;
`;
const Title = styled.h3`
  color: #000000ce;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
`;
const RoomControlContainer = styled.div`
  display: flex;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  overflow: auto;
`;
const RoomControl = styled.p`
  padding: 1rem;
  flex: 1;
  text-transform: capitalize;
  color: #000000ce;
  cursor: pointer;
  &.active {
    border-bottom: 1px solid black;
  }
`;
const RoomsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ChatRooms = ({
  changeConversation,
  setShowRooms,
  setShowModel,
  rooms,
  setRooms,
}) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const {
    user: { username },
  } = useAppContext();
  const { loading, data, error } = useFetch('/rooms');
  useEffect(() => {
    if (data) {
      setRooms(data.rooms);
    }
  }, [data]);

  useEffect(() => {
    const controls = document.querySelectorAll('.control');
    controls.forEach((control, activeIndex) => {
      if (control.classList.contains('active')) {
        control.classList.remove('active');
      }
      if (index === activeIndex) {
        control.classList.add('active');
      }
    });
  }, [index]);
  if (loading) {
    return (
      <Container>
        {' '}
        <LoadingAnimation />{' '}
      </Container>
    );
  } else {
    return (
      <Container>
        <HeaderContainer>
          <AiOutlineArrowLeft
            className='icon back'
            onClick={e => navigate(`/`)}
          />
          <TitleContaineer>
            <Title> {username} </Title>
            <MdOutlineKeyboardArrowDown className='icon' />
          </TitleContaineer>
          <IconButton onClick={() => setShowModel(true)}>
            <FaEdit className='icon' />
          </IconButton>
        </HeaderContainer>
        <RoomControlContainer>
          <RoomControl
            className='active control'
            onClick={e => setIndex(0)}
          >
            primary
          </RoomControl>
          <RoomControl
            className='control'
            onClick={e => setIndex(1)}
          >
            general
          </RoomControl>
        </RoomControlContainer>
        <RoomsContainer>
          {rooms.map(room => (
            <Room
              key={room._id}
              setShowRooms={setShowRooms}
              changeConversation={changeConversation}
              {...room}
            />
          ))}
        </RoomsContainer>
      </Container>
    );
  }
};

export default ChatRooms;
