import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatRooms from './ChatRooms';
import Conversations from './Conversations';
import ConversationPreview from './ConversationPreview';
import NewChatModel from './NewChatModel';

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  height: 90%;
  border: 1px solid #dbdbdb;
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  border-right: 1px solid #dbdbdb;
  padding: 0.5rem;
  display: ${props => (props.showRooms ? 'flex' : 'none')};
  @media screen and (min-width: 525px) {
    display: flex;
  }
`;
const Right = styled.div`
  display: ${props => (props.showRooms ? 'none' : 'flex')};
  flex: 2;
  @media screen and (min-width: 525px) {
    display: flex;
  }
`;
const Messenger = () => {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [showRooms, setShowRooms] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [rooms, setRooms] = useState([]);

  return (
    <Container>
      <Left showRooms={showRooms}>
        <ChatRooms
          rooms={rooms}
          setRooms={setRooms}
          setShowModel={setShowModel}
          setShowRooms={setShowRooms}
          changeConversation={setCurrentConversation}
        />
      </Left>
      <Right showRooms={showRooms}>
        {currentConversation ? (
          <Conversations
            setRooms={setRooms}
            setShowRooms={setShowRooms}
            setCurrentConversation={setCurrentConversation}
            conversation={currentConversation}
          />
        ) : (
          <ConversationPreview />
        )}
      </Right>
      {showModel && (
        <NewChatModel
          rooms={rooms}
          setCurrentConversation={setCurrentConversation}
          setShowModel={setShowModel}
        />
      )}
    </Container>
  );
};

export default Messenger;
