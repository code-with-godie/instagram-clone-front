import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { deleteData, updateData } from '../../api/apiCalls';
import Toast from '../models/Toast';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../loading/LoadingAnimation';

const Container = styled.div`
    background-color: ${props => props.theme.bg_primary};
    color: ${props => props.theme.text_primary};
    border-radius: 0.5rem;
    width: 100%;
    max-width: 400px;
    min-height: 100px;
`;
const Option = styled.p`
    padding: 0.7rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    text-transform: capitalize;
    cursor: pointer;
    &:not(:last-child) {
        border-bottom: 1px solid #dcdcdc;
    }
    &.main {
        color: tomato;
        font-weight: bold !important;
    }
    &.blocked {
        pointer-events: none;
        color: gray;
        cursor: pointer;
    }
`;
const PostOptions = ({ userID, handleModel, username, postID }) => {
    const {
        user: { followings, blockUser, _id: loggedInUserID },
        user,
        token,
        openToast,
        follow,
    } = useAppContext();
    const [following, setFollowing] = useState(followings?.includes(userID));
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blocked, setBlocked] = useState(blockUser.includes(userID));
    const [toastMessage, setToastMessage] = useState('');
    const mine = userID === loggedInUserID;
    const navigate = useNavigate();
    //component controllers

    const handleAccount = () => {
        navigate(`/profile/${username}`, { state: { _id: userID } });
    };
    const handleAddToFavourite = () => {
        console.log('add to favorites');
    };
    const handleCopyToClipBoard = () => {
        console.log('copy to clipboard');
    };
    const handleGoToPost = () => {
        navigate(`/p/${postID}`, { state: { _id: postID } });
    };
    const handleShare = () => {
        console.log('sharing post');
    };
    const handleEmbed = () => {
        console.log('embeding post');
    };
    const handleCancel = () => {
        handleModel(false);
    };
    const handleFollow = async () => {
        try {
            setLoading(true);
            const res = await follow(userID);
        } catch (error) {
            const messege =
                error?.response?.data?.message ||
                'Something went wrong.Try again later';
            openToast(messege);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async () => {
        try {
            const res = await deleteData(`/posts/${postID}`, {}, token);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setFollowing(followings?.includes(userID));
        setBlocked(blockUser.includes(userID));
    }, [user]);
    return (
        <Container>
            {mine ? (
                <>
                    <Option
                        className='main'
                        onClick={handleDelete}
                    >
                        Delete
                    </Option>
                    <Option>Edit</Option>
                    <Option>Hide like count</Option>
                    <Option>Turn off comenting</Option>
                </>
            ) : (
                <>
                    <Option className='main'>report</Option>
                    <Option
                        className={blocked ? 'main blocked' : 'main'}
                        onClick={handleFollow}
                    >
                        {' '}
                        {loading ? (
                            <LoadingAnimation />
                        ) : following ? (
                            'unfollow'
                        ) : (
                            'follow'
                        )}{' '}
                    </Option>
                    <Option
                        className={blocked && 'blocked'}
                        onClick={handleAddToFavourite}
                    >
                        add to favaurite
                    </Option>
                </>
            )}
            <Option onClick={handleGoToPost}>go to post</Option>
            <Option onClick={handleShare}>share to...</Option>
            <Option onClick={handleCopyToClipBoard}>copy link</Option>
            <Option onClick={handleEmbed}>embed</Option>
            <Option onClick={handleAccount}>about this account</Option>
            <Option onClick={handleCancel}>cancel</Option>
            {showToast && (
                <Toast
                    messege={toastMessage}
                    handleToast={setShowToast}
                />
            )}
        </Container>
    );
};

export default PostOptions;
