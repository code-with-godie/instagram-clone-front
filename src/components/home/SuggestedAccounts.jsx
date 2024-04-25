import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap:1.5rem;
padding:.5rem;
`
const Container = styled.div`
display: flex;
align-items: center;
gap:.5rem;
cursor: pointer;
`
const HeaderContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
align-items: center;
`
const Title = styled.h4`
text-transform: capitalize;
color: ${props => props.theme.text_primary};
`
const TitleDescription = styled.p`
    color: ${props => props.theme.text_primary};
    text-transform: capitalize;
    font-size:.9rem;
    
`
const ProfileContainer = styled.div`
flex: 1;
display: flex;
gap:.5rem;
`
const DescriptionContainer = styled.div`
display: flex;
flex-direction: column;
gap:.2rem;
`
const Username = styled.p`
color: ${props => props.theme.text_white_2};
`
const Name = styled.p`
font-weight: 200;
color: ${props => props.theme.text_white_2};
`
const SwitchAccount = styled.p`
font-weight: 300;
cursor: pointer;
color: ${props => props.theme.blue_2};
`
const SuggestedAccounts = () => {
  return (
    <Wrapper>
        <HeaderContainer>
            <Title>sugusted for you</Title>
            <TitleDescription>see all</TitleDescription>
        </HeaderContainer>
    <Container>
        <ProfileContainer>
            <Avatar/>
            <DescriptionContainer>
                <Username>code_with_godie</Username>
                <Name>godfrey maina</Name>
            </DescriptionContainer>
        </ProfileContainer>
            <SwitchAccount>follow</SwitchAccount>
    </Container>

    <Container>
        <ProfileContainer>
            <Avatar/>
            <DescriptionContainer>
                <Username>code_with_godie</Username>
                <Name>godfrey maina</Name>
            </DescriptionContainer>
        </ProfileContainer>
            <SwitchAccount>follow</SwitchAccount>
    </Container>

    <Container>
        <ProfileContainer>
            <Avatar/>
            <DescriptionContainer>
                <Username>code_with_godie</Username>
                <Name>godfrey maina</Name>
            </DescriptionContainer>
        </ProfileContainer>
            <SwitchAccount>follow</SwitchAccount>
    </Container>

    <Container>
        <ProfileContainer>
            <Avatar/>
            <DescriptionContainer>
                <Username>code_with_godie</Username>
                <Name>godfrey maina</Name>
            </DescriptionContainer>
        </ProfileContainer>
            <SwitchAccount>follow</SwitchAccount>
    </Container>

    <Container>
        <ProfileContainer>
            <Avatar/>
            <DescriptionContainer>
                <Username>code_with_godie</Username>
                <Name>godfrey maina</Name>
            </DescriptionContainer>
        </ProfileContainer>
            <SwitchAccount>follow</SwitchAccount>
    </Container>
    </Wrapper>
  )

}


export default SuggestedAccounts