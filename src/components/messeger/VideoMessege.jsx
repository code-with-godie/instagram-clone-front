import { IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import styled from 'styled-components';
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const VideoWrapper = styled.div`
    .play-btn {
        position: absolute;
        z-index: 10;
        color: #f9f9f9;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
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
    width: 100%;
    position: relative;
`;
const Title = styled.p`
    background-color: ${props => (props.mine ? '#f0f2f5' : ' #1b74e4')};
    color: ${props => !props.mine && '#ffffff'};
    padding: 0.5rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
`;
const Video = styled.video`
    max-width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: contain;
`;
const VideoMessege = ({ url, messege, mine }) => {
    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);
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
        videoRef.current?.addEventListener('play', handlePlayAndPause);
        videoRef.current?.addEventListener('pause', handlePlayAndPause);
        return () => {
            videoRef.current?.removeEventListener('play', handlePlayAndPause);
            videoRef.current?.removeEventListener('pause', handlePlayAndPause);
        };
    }, [videoRef]);
    return (
        <Container>
            <VideoWrapper
                ref={videoContainerRef}
                className='paused'
            >
                <Video
                    ref={videoRef}
                    src={url?.source}
                />
                <IconButton
                    className='play-btn play'
                    onClick={togglePlay}
                >
                    {' '}
                    <BsFillPlayFill />{' '}
                </IconButton>
                <IconButton
                    className='play-btn pause'
                    onClick={togglePlay}
                >
                    {' '}
                    <BsFillPauseFill />{' '}
                </IconButton>
            </VideoWrapper>

            {messege?.length > 0 && (
                <Title mine={mine}>
                    {' '}
                    {`${
                        messege?.length > 700
                            ? `${messege.substring(0, 700)}...`
                            : `${messege}`
                    }`}{' '}
                </Title>
            )}
        </Container>
    );
};

export default VideoMessege;
