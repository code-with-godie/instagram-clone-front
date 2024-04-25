import React from 'react'
import styled from 'styled-components'
import {FiSend} from 'react-icons/fi'
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`
const IconContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 1rem;
border: 2px solid black;
padding: 1.5rem;
transform: rotate(10deg);
border-radius:50%;
.icon{
  font-size: 3rem;
  color: #000000d7;
}
`
const Title = styled.p`
color: #000000d7;
font-family: 'Poppins',sans-serif;
font-size: 1.2rem;
`
const SubTitle = styled.p`
color: #00000084;
font-weight: 400;
font-size:.9rem;
`
const SendButton = styled.button`
font-family: 'Poppins',sans-serif;
color: white;
padding: 0.5rem;
font-weight: 600;
background-color: #1877F2;
border: none;
outline: none;
border-radius:.5rem;
cursor: pointer;
`
const ConversationPreview = () => {
  return (
    <Container>
      <IconContainer>
        <FiSend className='icon' />
      </IconContainer>
      <Title>Your messages</Title>
      <SubTitle>Send private photos and messages to a friend or group.</SubTitle>
      <SendButton>Send message</SendButton>

    </Container>
  )
}

export default ConversationPreview