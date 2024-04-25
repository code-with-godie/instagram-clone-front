import React, { useState } from 'react';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostUserControl from './PostUserControl';
import PostLikesIndicator from './PostLikesIndicator';
import PostComments from './PostComments';

const Container = styled.div`
    border-bottom: 1px solid #dbdbdb;
`;
const Post = ({
    url: { postUrl },
    createdAt,
    postType,
    caption,
    user: { username, profilePic, _id: userID },
    related,
    likes,
    bookmarks,
    _id: postID,
    observer,
    muted,
    setMuted,
}) => {
    const [postLikes, setPostLikes] = useState(likes.length);

    return (
        <Container>
            <PostHeader
                _id={userID}
                date={createdAt}
                username={username}
                profilePic={profilePic?.url}
                postID={postID}
            />
            <PostContent
                url={postUrl}
                observer={observer}
                muted={muted}
                setMuted={setMuted}
                postType={postType}
                related={related}
            />
            <PostUserControl
                likes={likes}
                bookmarks={bookmarks}
                postID={postID}
                userID={userID}
                setPostLikes={setPostLikes}
            />
            {postLikes > 0 && <PostLikesIndicator likes={postLikes} />}
            <PostComments
                profilePic={profilePic}
                username={username}
                caption={caption}
                postType={postType}
                url={postUrl}
                postID={postID}
                likes={likes}
                setPostLikes={setPostLikes}
                bookmarks={bookmarks}
            />
        </Container>
    );
};

export default Post;
