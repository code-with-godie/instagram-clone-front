import {
    KeyboardArrowDown,
    MoreHoriz,
    PersonAdd,
    Settings,
} from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';
import { postData, updateData } from '../../api/apiCalls';
import Toast from '../models/Toast';
import Model from '../models/Model';
import Information from './Information';
import UserOptions from './UserOptions';
import { useNavigate } from 'react-router-dom';
import BlockOptions from './BlockOptions';
import EditProfile from './EditProfile';

const Container = styled.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${props => props.theme.text_primary};
`;
const AvatarContainer = styled.div`
    position: relative;
    .avator {
        width: 100px;
        height: 100px;
        border-top: 2px solid #fe016a;
        border-right: 2px solid #d600be;
        border-bottom: 2px solid #ffc500;
        border-left: 2px solid #ff3938;
    }
    .avator.mine {
        cursor: pointer;
    }
    @media screen and (min-width: 500px) {
        padding: 0.5rem;
        .avator {
            width: 150px;
            height: 150px;
        }
    }
    @media screen and (min-width: 768px) {
        flex: 1;
        max-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        .avator {
            width: 200px;
            height: 200px;
        }
    }
`;
const LoadingContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 10;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DescriptionContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @media screen and (min-width: 600px) {
        flex-direction: row;
        gap: 0.5rem;
        .hide {
            display: none;
        }
        & > :nth-child(2) {
            flex: 1;
            justify-content: flex-start;
            gap: 0.5rem;
        }
    }
`;
const UsernameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    max-width: 300px;
`;
const Username = styled.h4`
    text-transform: capitalize;
    font-family: 'Poppins', sans-serif;
`;
const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    max-width: 400px;
    .hidden {
        display: none;
    }
    @media screen and (min-width: 768px) {
        .hidden {
            display: block;
        }
    }
`;
const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`;
const Control = styled.button`
    border: none;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    text-transform: capitalize;
    border-radius: 0.3rem;
    background: ${props => props.theme.border};
    font-family: 'Poppins', sans-serif;
    &:disabled {
        color: gray;
        cursor: not-allowed;
    }
    cursor: pointer;
    &:hover {
        background: #e3e2e2;
    }
`;
const ProfileDescription = ({
    userID,
    showSuggested,
    setCompleteAccountSetup,
    getUser,
}) => {
    const {
        user: { _id: loggedInUserID, blockUser, followings },
        user: loggedInUser,
        setUser: setLoggedInUser,
        follow,
        token,
    } = useAppContext();
    const [user, setUser] = useState(undefined);
    const { loading, data, error } = useFetch(`/users/${userID}`);
    const [following, setFollowing] = useState(followings.includes(userID));
    const [showToast, setShowToast] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [index, setIndex] = useState(0);
    const [toastMessage, setToastMessage] = useState('');
    const mine = loggedInUserID === userID;
    const [blocked, setBlocked] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [messegerLoading, setMessegerLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    //component controllers
    const handleModel = index => {
        if (index === 0) {
            setShowModel(prev => (mine ? true : false));
            setIndex(index);
            return;
        }
        setShowModel(true);
        setIndex(index);
    };
    const handleMessageClick = async () => {
        const res = await postData('/rooms', { receiverID: user?._id }, token);
        if (res.success) {
            navigate('/direct/inbox');
        }
    };

    useEffect(() => {
        if (data) {
            setUser(data.user);
        }
    }, [data]);
    useEffect(() => {
        getUser(user);
        setFollowing(followings.includes(userID));
        setBlocked(blockUser.includes(userID));
    }, [user]);
    useEffect(() => {
        setFollowing(followings.includes(userID));
        setBlocked(blockUser.includes(userID));
    }, [loggedInUser]);
    useEffect(() => {
        if (user?.followings.length === 0) {
            mine && setCompleteAccountSetup(true);
        }
    }, [user]);
    if (loading) {
        return <LoadingAnimation />;
    }
    return (
        <Container>
            <AvatarContainer>
                <Avatar
                    className={mine ? 'avator mine' : 'avator'}
                    alt={user?.name}
                    src={user?.profilePic?.url}
                    onClick={e => handleModel(0)}
                />
                {profileLoading && (
                    <LoadingContainer>
                        <LoadingAnimation large />{' '}
                    </LoadingContainer>
                )}
            </AvatarContainer>
            <LeftContainer>
                <DescriptionContainer>
                    <UsernameContainer>
                        <Username> {user?.username} </Username>
                        <IconButton className='hide'>
                            <MoreHoriz />
                        </IconButton>
                    </UsernameContainer>
                    <ControlsContainer>
                        {mine ? (
                            <>
                                <Control onClick={e => setEdit(true)}>
                                    Edit profile
                                </Control>
                                <Control>Ad tools</Control>
                                <Control>
                                    {' '}
                                    <Settings />{' '}
                                </Control>{' '}
                            </>
                        ) : (
                            <>
                                <Control
                                    disabled={blocked}
                                    onClick={e => follow(userID)}
                                >
                                    {' '}
                                    {following ? 'following' : 'follow'}{' '}
                                    <KeyboardArrowDown />{' '}
                                </Control>
                                <Control
                                    disabled={blocked}
                                    onClick={handleMessageClick}
                                >
                                    {' '}
                                    {messegerLoading ? (
                                        <LoadingAnimation />
                                    ) : (
                                        'Message'
                                    )}{' '}
                                </Control>
                                <Control
                                    disabled={blocked}
                                    onClick={e => showSuggested(prev => !prev)}
                                >
                                    <PersonAdd />
                                </Control>
                                <Control
                                    className='show hidden'
                                    onClick={e => handleModel(1)}
                                >
                                    <MoreHoriz />
                                </Control>
                            </>
                        )}
                    </ControlsContainer>
                </DescriptionContainer>
                <Information user={user} />
            </LeftContainer>
            {showToast && (
                <Toast
                    messege={toastMessage}
                    handleToast={setShowToast}
                />
            )}
            {showModel && (
                <Model
                    center
                    bg={`rgba(0, 0, 0, 0.178)`}
                >
                    {index === 0 && (
                        <UserOptions
                            handleModel={setShowModel}
                            setProfileLoading={setProfileLoading}
                            setCurrentUser={setUser}
                        />
                    )}
                    {index === 1 && (
                        <BlockOptions
                            handleModel={setShowModel}
                            username={user?.username}
                            url={user?.profilePic?.url}
                            userID={userID}
                            blocked={blocked}
                            setBlocked={setBlocked}
                        />
                    )}
                </Model>
            )}
            {edit && (
                <Model
                    center
                    full
                    bg={`rgba(0, 0, 0, 0.178)`}
                >
                    <EditProfile closeModel={setEdit} />
                </Model>
            )}
        </Container>
    );
};

export default ProfileDescription;
