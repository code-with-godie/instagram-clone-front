import React from 'react';
import Model from '../../components/models/Model';
import DisplayPost from './DisplayPost';
const AllComments = ({
    handleModel,
    postType,
    setPostLikes,
    url,
    profilePic,
    username,
    caption,
    setCommentCount,
    handleCommnets,
    setComments,
    postID,
    bookmarks,
    likes,
    comments,
}) => {
    return (
        <Model
            bg='rgba(0, 0, 0, 0.274)'
            showClose
            openModel={handleModel}
            center
        >
            <DisplayPost
                postType={postType}
                url={url}
                setPostLikes={setPostLikes}
                profilePic={profilePic}
                username={username}
                caption={caption}
                setCommentCount={setCommentCount}
                handleCommnets={handleCommnets}
                setComments={setComments}
                postID={postID}
                bookmarks={bookmarks}
                likes={likes}
                comments={comments}
            />
        </Model>
    );
};

export default AllComments;
