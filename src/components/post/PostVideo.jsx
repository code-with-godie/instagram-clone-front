import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { IconButton, Slider } from '@mui/material';
import { FaVolumeUp } from 'react-icons/fa';
import { BiVolumeMute } from 'react-icons/bi';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;
const SliderContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 100000;
  padding: 1rem 3rem;
`;
const Time = styled.p`
  color: white;
`;
const Video = styled.video`
  max-width: 100%;
  height: ${props => (props.cover ? 'inherit' : ' auto')};
  width: ${props => props.cover && '100%'};
  object-fit: ${props => (props.cover ? 'cover' : 'contain')};
  max-height: 600px;
  &.model {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;
const PostVideo = ({ url, cover, model, observer, muted, setMuted }) => {
  const videoRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [time, setTime] = useState(0);
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
  const handleTimeUpdate = () => {
    setSliderValue(videoRef.current.currentTime);
  };

  useEffect(() => {
    const video = videoRef.current;
    video && observer.observe(videoRef.current);
    video?.addEventListener('click', togglePlay);
    video?.addEventListener('play', handlePlayAndPause);
    video?.addEventListener('pause', handlePlayAndPause);
    video?.addEventListener('timeupdate', handleTimeUpdate);
    video && setTime(video?.duration);
    return () => {
      video?.removeEventListener('click', togglePlay);
      video?.removeEventListener('play', handlePlayAndPause);
      video?.removeEventListener('pause', handlePlayAndPause);
      video?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, observer]);
  return (
    <Wrapper
      ref={videoContainerRef}
      className='paused'
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
        ref={videoRef}
        src={url}
        loop
        muted={muted}
        cover={cover}
        className={model && 'model'}
      />
      <IconButton className='play-btn play'>
        {' '}
        <BsFillPlayFill />{' '}
      </IconButton>
      <IconButton className='play-btn pause'>
        {' '}
        <BsFillPauseFill />{' '}
      </IconButton>
      <SliderContainer>
        <Slider
          min={0}
          value={sliderValue}
          onChange={setSliderValue}
          max={time}
          size='small'
          sx={{
            color: 'white',
          }}
        />
        <Time> {time} </Time>
      </SliderContainer>
    </Wrapper>
  );
};

export default PostVideo;
