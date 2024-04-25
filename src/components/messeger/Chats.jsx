import React, { useState } from 'react';
import styled from 'styled-components';
import Messege from './Messege';
import ConversationHeader from './ConversationHeader';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    overflow: auto;
`;
const SayHiContainer = styled(Container)`
    align-items: flex-end;
`;
const SayHi = styled.p`
    font-size: 0.9rem;
    color: #555555;
`;
const Chats = ({ chats, messegeRef, conversation }) => {
    if (chats.length === 0) {
        return (
            <SayHiContainer>
                🙌
                <SayHi>say Hi</SayHi>
            </SayHiContainer>
        );
    }
    return (
        <Container>
            <ConversationHeader conversation={conversation} />
            {chats.map(messege => (
                <Messege
                    key={messege._id}
                    {...messege}
                    messegeRef={messegeRef}
                />
            ))}
        </Container>
    );
};

export default Chats;
