import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaVolumeUp } from 'react-icons/fa';
import { BiVolumeMute } from 'react-icons/bi';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { Avatar, IconButton } from '@mui/material';
import { Audiotrack } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
  flex: 1;
  box-shadow: 0 0 10px 5px rgba(147, 146, 146, 0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000da;
  position: relative;
  .volume {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    background-color: #8282821e;
    color: white;
    font-size: 1.3rem;
    :hover {
      background-color: #8282821e;
    }
  }
  .play-btn {
    position: absolute;
    pointer-events: none;
    z-index: 10;
    color: white;
    font-size: 2rem;
    padding: 1rem;
    background-color: #00000073;
    opacity: 0;
    transition: 500ms;
    :hover {
      background-color: #00000073;
    }
  }
  &.paused {
    .play {
      opacity: 1;
    }
  }
  &:not(.paused) {
    .pause {
      opacity: 1;
    }
  }
  @media screen and (min-width: 768px) {
    border-radius: 0.5rem;
  }
`;
const Video = styled.video`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
  outline: none;
`;
const DescriptionContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  z-index: 10;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    border-radius: 0.5rem;
  }
`;
const DescriptionTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .profile {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
const DescriptionBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .icon {
    color: white;
    font-size: 1rem;
  }
`;
const UserName = styled.h4`
  color: white;
  font-weight: 600;
  &.small {
    font-weight: 400;
    font-size: 0.8rem;
  }
`;
const Follow = styled.p`
  color: white;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  &.small {
    font-weight: 400;
    font-size: 0.8rem;
  }
`;
const Dot = styled.p`
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;
const VideoPlayer = ({
  url: { postUrl },
  username,
  observer,
  profilePic: { url },
  postUserID,
  name,
  muted,
  setMuted,
}) => {
  const {
    user: { _id: userID, followings },
    follow,
  } = useAppContext();
  const [following, setFollowing] = useState(followings?.includes(postUserID));
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const handlePlayAndPause = e => {
    videoContainerRef.current?.classList.toggle(
      'paused',
      videoContainerRef.current?.paused
    );
  };
  const togglePlay = e => {
    videoRef.current?.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  };
  useEffect(() => {
    setFollowing(followings?.includes(postUserID));
  }, [followings]);
  useEffect(() => {
    const video = videoRef.current;
    video && observer?.observe(videoRef.current);
    video?.addEventListener('click', togglePlay);
    video?.addEventListener('play', handlePlayAndPause);
    video?.addEventListener('pause', handlePlayAndPause);
    return () => {
      video?.removeEventListener('click', togglePlay);
      video?.removeEventListener('play', handlePlayAndPause);
      video?.removeEventListener('pause', handlePlayAndPause);
    };
  }, [videoRef, observer]);

  return (
    <Container
      className='paused'
      ref={videoContainerRef}
    >
      {muted ? (
        <IconButton
          className='volume'
          onClick={e => setMuted(false)}
        >
          <BiVolumeMute />{' '}
        </IconButton>
      ) : (
        <IconButton
          className='volume'
          onClick={e => setMuted(true)}
        >
          <FaVolumeUp />{' '}
        </IconButton>
      )}

      <Video
        src={postUrl}
        muted={muted}
        loop
        ref={videoRef}
      />
      <IconButton className='play-btn play'>
        {' '}
        <BsFillPlayFill />{' '}
      </IconButton>
      <IconButton className='play-btn pause'>
        {' '}
        <BsFillPauseFill />{' '}
      </IconButton>
      <DescriptionContainer>
        <DescriptionTop>
          <Avatar
            className='profile'
            alt={name}
            src={url}
          />
          <UserName> {username} </UserName>
          {userID !== postUserID && (
            <>
              <Dot>.</Dot>
              <Follow onClick={e => follow(postUserID)}>
                {' '}
                {following ? 'unfollow' : 'follow'}{' '}
              </Follow>
            </>
          )}
        </DescriptionTop>
        <DescriptionBottom>
          <Audiotrack className='icon' />
          <UserName className='small'> {username} </UserName>
          <Follow className='small'> original sound </Follow>
        </DescriptionBottom>
      </DescriptionContainer>
    </Container>
  );
};

export default VideoPlayer;
