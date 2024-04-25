import { FavoriteBorderOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import AccountDescription from './AccountDescription';

const Container = styled.div`
    display: flex;
    position: relative;
    .icon {
        font-size: 0.8rem;
        color: ${props => props.theme.primary_2};
        /* visibility: hidden; */
    }
`;

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .profile {
        width: 30px;
        height: 30px;
    }
`;
const UserName = styled.h4`
    color: ${props => props.theme.text_primary};
    font-family: 'Lora', sans-serif;
    font-size: 0.9rem;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;
const Comment = styled.p`
    font-size: 0.9rem;
    font-weight: 100;
    display: flex;
    gap: 1rem;
    color: ${props => props.theme.text_primary};
    :hover + .icon {
        visibility: visible;
    }
`;
const PostComment = ({
    comment,
    user: { username, profilePic },
    model,
    url,
}) => {
    const [showAccount, setShowAccount] = useState(false);
    return (
        <Container
        // onMouseLeave={e => setShowAccount(false)}
        // onMouseEnter={e => setShowAccount(true)}
        >
            <Wrapper>
                {model && (
                    <IconButton>
                        {' '}
                        <Avatar
                            alt={username}
                            src={profilePic?.url}
                            className='profile'
                        />{' '}
                    </IconButton>
                )}
                <UserName> {username} </UserName>
                <Comment> {comment} </Comment>
            </Wrapper>
            <IconButton>
                {' '}
                <FavoriteBorderOutlined className='icon' />{' '}
            </IconButton>
            {showAccount && (
                <AccountDescription
                    profile={profilePic}
                    username={username}
                />
            )}
        </Container>
    );
};

export default PostComment;
