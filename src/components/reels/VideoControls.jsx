import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FavoriteBorderOutlined,
  BookmarkBorder,
  MoreHoriz,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';
import { RiMessengerLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { Avatar, IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { updateData } from '../../api/apiCalls';

const Container = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  bottom: 50px;
  z-index: 1000;
  /* height: auto; */
  @media screen and (min-width: 768px) {
    position: static;
  }
`;
const Control = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: center;
  .profile {
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .icon {
    color: #ffffff;
    font-size: 2rem;
    @media screen and (min-width: 768px) {
      font-size: 1.7rem;
      color: #000000dd;
    }
  }
  .liked {
    fill: tomato;
  }
  .bookmarked {
    fill: #ffffff;
    @media screen and (min-width: 768px) {
      fill: #161616e6;
    }
  }
`;
const ControlLabel = styled.p`
  font-size: 1rem;
  color: #ffffff;
  @media screen and (min-width: 768px) {
    font-size: 0.9rem;
    color: #000000dd;
  }
`;
const VideoControls = ({
  profile,
  username,
  likes,
  bookmarks,
  postID,
  postUserID,
}) => {
  const {
    user: { _id: userID },
    token,
    socket,
  } = useAppContext();
  const [liked, setLiked] = useState(likes.includes(userID));
  const [bookmarked, setBookmarked] = useState(bookmarks.includes(userID));
  const [postLikes, setPostLikes] = useState(likes.length);

  const handleLike = async ({ username }) => {
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
      const res = await updateData(`/posts/bookmark/${postID}`, {}, token);
      if (res.success) {
        setBookmarked(() => (res.bookmarked ? true : false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Control>
        <IconButton onClick={handleLike}>
          {liked ? (
            <Favorite className='icon liked' />
          ) : (
            <FavoriteBorder className='icon' />
          )}
        </IconButton>
        <ControlLabel> {postLikes} </ControlLabel>
      </Control>
      <Control>
        <IconButton>
          <RiMessengerLine className='icon' />
        </IconButton>
        <ControlLabel>333k</ControlLabel>
      </Control>
      <Control>
        <IconButton>
          <FiSend className='icon' />
        </IconButton>
      </Control>
      <Control>
        <IconButton onClick={handleBookmark}>
          {bookmarked ? (
            <BsBookmarkFill className='icon bookmarked' />
          ) : (
            <BsBookmark className='icon' />
          )}
        </IconButton>
      </Control>
      <Control>
        <IconButton>
          <MoreHoriz className='icon' />
        </IconButton>
      </Control>
      <Control>
        <Avatar
          className='profile'
          src={profile}
          alt={username}
        />
      </Control>
    </Container>
  );
};

export default VideoControls;
