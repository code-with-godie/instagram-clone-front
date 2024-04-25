import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
const Container = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    .profile {
        width: 50px;
        height: 50px;
    }
    /* .link {
        color: ${props => props.theme.text_semi_black};
        padding: 0.5rem 1rem;
        background: ${props => props.theme.text_gray_2};
        border-radius: 0.5rem;
        text-decoration: none;
    } */
`;

const NameUserName = styled.h4`
    color: ${props => props.theme.text_semi_black};
`;
const Name = styled.p`
    color: ${props => props.theme.text_gray_1};
`;
const Button = styled.p`
    color: ${props => props.theme.text_semi_black};
    padding: 0.5rem 1rem;
    background: ${props => props.theme.text_gray_2};
    border-radius: 0.5rem;
    cursor: pointer;
`;
const ConversationHeader = ({ conversation }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/profile/${conversation?.username}`, {
            state: { _id: conversation?.receiverID },
        });
    };
    return (
        <Container>
            <IconButton>
                <Avatar
                    className='profile'
                    src={conversation?.profilePic?.url}
                    alt={conversation?.username}
                />
            </IconButton>
            <NameUserName> {conversation?.username} </NameUserName>
            <Name> {conversation?.name} </Name>
            <Button onClick={handleClick}>View profile</Button>
        </Container>
    );
};

export default ConversationHeader;
