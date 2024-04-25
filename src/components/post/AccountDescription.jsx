import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { RiMessengerLine } from 'react-icons/ri';
import AccountInfo from './AccountInfo';

const Container = styled.div`
    position: absolute;
    top: 100%;
    width: 100vw;
    max-width: 400px;
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0 0 3px 2px #f7f7f7;
    z-index: 100;
    border-radius: 0.3rem;
`;
const ProfileContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    .profile {
        width: 70px;
        height: 70px;
        border-top: 2px solid #fe016a;
        border-right: 2px solid #d600be;
        border-bottom: 2px solid #ffc500;
        border-left: 2px solid #ff3938;
    }
`;
const ProfileDescription = styled.div``;
const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
const PostContainer = styled.div`
    min-height: 200px;
`;
const Username = styled.h2`
    font-size: 1.5rem;
    color: ${props => props.theme.text_black};
`;
const UsernameDescripytion = styled.p`
    font-weight: 200;
    color: ${props => props.theme.primary_2};
`;
const Button = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: ${props => props.bg};
    color: ${props => props.white && props.theme.bg_primary};
    .icon {
        font-size: 1.5rem;
        color: white;
    }
`;
const ControlContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;
const AccountDescription = ({ profile, username, followings, followers }) => {
    return (
        <Container>
            <ProfileContainer>
                <IconButton>
                    <Avatar
                        className='profile'
                        src={profile}
                    />
                </IconButton>
                <ProfileDescription>
                    <Username> {username} </Username>
                    <UsernameDescripytion>{username}</UsernameDescripytion>
                </ProfileDescription>
            </ProfileContainer>
            <DescriptionContainer>
                <AccountInfo
                    followers={followers}
                    followings={followings}
                />
                <AccountDescription />
            </DescriptionContainer>
            <PostContainer></PostContainer>
            <ControlContainer>
                <Button
                    white
                    bg=' #0095f6'
                >
                    <RiMessengerLine className='icon' /> message
                </Button>
                <Button bg='#efefef'>follow</Button>
            </ControlContainer>
        </Container>
    );
};

export default AccountDescription;
