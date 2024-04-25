import React from 'react';
import styled from 'styled-components';
const Video = styled.video`
    max-width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 100%;
    border-radius: 0.5rem;
    align-self: center;
`;
const VideoPreview = ({ url }) => {
    return <Video src={url} />;
};

export default VideoPreview;
