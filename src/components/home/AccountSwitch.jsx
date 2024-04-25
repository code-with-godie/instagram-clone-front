import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 3rem 0.5rem 0.5rem 0.5rem;
    gap: 0.5rem;
`;
const ProfileContainer = styled.div`
    flex: 1;
    display: flex;
    gap: 0.5rem;
`;
const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;
const Username = styled.p``;
const Name = styled.p`
    font-weight: 200;
    color: ${props => props.theme.text_white_2};
    text-transform: capitalize;
`;
const SwitchAccount = styled.p`
    font-weight: 300;
    cursor: pointer;
    color: ${props => props.theme.blue_2};
`;
const AccountSwitch = () => {
    const {
        user: {
            username,
            name,
            profilePic: { url },
        },
    } = useAppContext();
    return (
        <Container>
            <ProfileContainer>
                <Avatar
                    alt={name}
                    src={url}
                />
                <DescriptionContainer>
                    <Username> {username} </Username>
                    <Name> {name} </Name>
                </DescriptionContainer>
            </ProfileContainer>
            <SwitchAccount>switch</SwitchAccount>
        </Container>
    );
};

export default AccountSwitch;
