
import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 230px;
`
const HeadingContainer = styled.div`
    padding:.5rem;
    display: flex;
    justify-content: space-between;
`
const Title = styled.p`
color: ${props => props.theme.primary_2};
font-family: 'Lora', sans-serif;
text-transform: capitalize;
`
const Container  = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    overflow: auto;
    gap:.5rem;
    ::-webkit-scrollbar {
      display: none;
    }
`
const CompleteAccount = () => {
  return (
    <Wrapper>
        <HeadingContainer>
            <Title>complete your profile</Title>
        </HeadingContainer>
    <Container>
        <h1>account setup</h1>
    </Container>
        </Wrapper>
  )
}

export default CompleteAccount