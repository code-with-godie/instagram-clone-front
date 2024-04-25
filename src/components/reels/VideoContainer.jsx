import React from 'react';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';
import VideoControls from './VideoControls';

const Container = styled.div`
  width: 100%;
  /* max-width: 450px; */
  flex: 0 0 90%;
  display: flex;
  position: relative;
  max-height: 98vh;
`;
const VideoContainer = ({
  url,
  user: { profilePic, name, username, _id: postUserID },
  videoRef,
  _id: postID,
  likes,
  observer,
  muted,
  setMuted,
  bookmarks,
}) => {
  return (
    <Container>
      <VideoPlayer
        url={url}
        observer={observer}
        muted={muted}
        setMuted={setMuted}
        username={username}
        name={name}
        profilePic={profilePic}
        videoRef={videoRef}
        postUserID={postUserID}
      />
      <VideoControls
        profile={profilePic?.url}
        postID={postID}
        username={username}
        likes={likes}
        postUserID={postUserID}
        bookmarks={bookmarks}
      />
    </Container>
  );
};

export default VideoContainer;
