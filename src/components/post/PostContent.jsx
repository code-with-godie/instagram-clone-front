import React from 'react';
import styled from 'styled-components';
import PostImage from './PostImage';
import PostVideo from './PostVideo';
import PostCollection from './PostCollection';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000ed;
    width: 100%;
`;
const PostContent = ({
    url,
    postType,
    model,
    related,
    observer,
    muted,
    setMuted,
}) => {
    return (
        <Container>
            {postType === 'video' ? (
                <PostVideo
                    observer={observer}
                    muted={muted}
                    setMuted={setMuted}
                    url={url}
                    model={model}
                />
            ) : postType === 'collection' ? (
                <PostCollection
                    height
                    related={related}
                    showControls
                />
            ) : (
                <PostImage
                    url={url}
                    model={model}
                />
            )}
        </Container>
    );
};

export default PostContent;
