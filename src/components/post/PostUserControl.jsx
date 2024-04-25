import { Bookmark, Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BiMessageRounded } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useAppContext } from '../../context/AppContext';
import { updateData } from '../../api/apiCalls';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    color: ${props => props.theme.text_primary};
    .icon {
        font-size: 1.5rem;
        color: ${props => props.theme.text_primary};
        cursor: pointer;
        :hover {
            opacity: 0.7;
        }
    }
    .liked {
        fill: tomato;
    }
`;
const IconContainer = styled.div`
    flex: 1;
    display: flex;
    gap: 1rem;
    align-items: center;
`;
const PostUserControl = ({
    likes,
    bookmarks,
    postID,
    setPostLikes,
    userID: postUserID,
}) => {
    const {
        user: { _id: userID, username },
        token,
        socket,
    } = useAppContext();
    const [liked, setLiked] = useState(likes.includes(userID));
    const [bookmarked, setBookmarked] = useState(bookmarks.includes(userID));

    const handleLike = async () => {
        try {
            const res = await updateData(`/posts/like/${postID}`, {}, token);
            if (res.success) {
                setLiked(res.like ? true : false);
                setPostLikes(prev => (res.like ? prev + 1 : prev - 1));
                res.like &&
                    userID !== postUserID &&
                    socket?.emit(
                        'SEND_NOTIFICATION',
                        `${username} liked your post`,
                        postUserID
                    );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleBookmark = async () => {
        try {
            const res = await updateData(
                `/posts/bookmark/${postID}`,
                {},
                token
            );
            if (res.success) {
                setBookmarked(() => (res.bookmarked ? true : false));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleShare = () => {
        console.log('sharing a post');
    };

    return (
        <Container>
            <IconContainer>
                <IconButton onClick={handleLike}>
                    {liked ? (
                        <Favorite className='icon liked' />
                    ) : (
                        <FavoriteBorder className='icon' />
                    )}
                </IconButton>
                <Tooltip title='Comment'>
                    <BiMessageRounded className='icon' />
                </Tooltip>
                <IconButton onClick={handleShare}>
                    <FiSend className='icon' />
                </IconButton>
            </IconContainer>
            <IconButton onClick={handleBookmark}>
                {bookmarked ? (
                    <BsBookmarkFill className='icon bookmarked' />
                ) : (
                    <BsBookmark className='icon' />
                )}
            </IconButton>
        </Container>
    );
};

export default PostUserControl;
