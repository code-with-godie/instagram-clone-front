import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
    display: flex;
    color: ${props => props.theme.text_primary};
    border-bottom: 1px solid ${props => props.theme.border};
    .icon {
        font-size: 2.5rem;
        color: ${props => props.theme.text_primary};
    }
    .icon-container {
        padding: 0;
    }
    @media screen and (min-width: 768px) {
        display: none;
    }
`;
const UserNameContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const UserName = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
`;
const ProfileHeader = () => {
    const navigate = useNavigate();
    const {
        user: { username },
    } = useAppContext();
    return (
        <Container>
            <IconButton
                className='icon-container'
                onClick={e => navigate('/')}
            >
                <KeyboardArrowLeft className='icon' />
            </IconButton>
            <UserNameContainer>
                <UserName> {username} </UserName>
            </UserNameContainer>
        </Container>
    );
};

export default ProfileHeader;
