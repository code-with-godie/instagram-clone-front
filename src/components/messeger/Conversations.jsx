import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import ChatInput from './ChatInput';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ErrorMessage = styled.h2`
  color: #a7a7a7df;
  text-align: center;
  font-size: 3rem;
  letter-spacing: 1.5px;
  font-style: italic;
  font-family: 'Courier New', Courier, monospace;
`;
const Conversations = ({
  conversation,
  setShowRooms,
  setRooms,
  setCurrentConversation,
}) => {
  const [chats, setChats] = useState([]);
  const { data, loading, error } = useFetch(
    `/messeges/${conversation?.roomID}?mode=${conversation?.mode}`
  );
  const messegeRef = useRef(null);
  useEffect(() => {
    messegeRef.current?.scrollIntoView();
  }, [chats]);
  useEffect(() => {
    if (data) {
      setChats(data?.messages);
    }
  }, [data]);
  return (
    <Container>
      <ChatHeader
        setShowRooms={setShowRooms}
        username={conversation?.username || 'default username'}
        profilePic={conversation?.profilePic}
        receiverID={conversation?.receiverID}
      />
      {loading ? (
        <Container>
          <LoadingAnimation />
        </Container>
      ) : error ? (
        <Container>
          <ErrorMessage>
            Something went wrong while loading the chats
          </ErrorMessage>
        </Container>
      ) : (
        <Chats
          chats={chats}
          conversation={conversation}
          messegeRef={messegeRef}
        />
      )}
      <ChatInput
        setRooms={setRooms}
        roomID={conversation?.roomID}
        receiverID={conversation?.receiverID}
        setChats={setChats}
        setCurrentConversation={setCurrentConversation}
      />
    </Container>
  );
};

export default Conversations;
