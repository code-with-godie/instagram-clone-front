import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DisplayPost from '../post/DisplayPost';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';
const Container = styled.div`
    width: 100%;
    max-width: 900px;
    height: 90%;
    border: 1px solid #dbdbdb;
    display: flex;
`;
const Left = styled.div`
    flex: 1;
    background-color: red;
`;
const Right = styled.div`
    flex: 2;
    background-color: blue;
`;
const Post = ({ postID }) => {
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    const { data, loading, error } = useFetch(`/posts/single/${postID}`);
    const { data: tempComments } = useFetch(`/comments/${postID}`);

    const [post, setPost] = useState(null);
    const [postLikes, setPostLikes] = useState(post?.likes?.length);

    useEffect(() => {
        data && setPost(data?.post);
    }, [data]);
    useEffect(() => {
        tempComments && setComments(tempComments?.comments);
    }, [tempComments]);
    useEffect(() => {
        post && setLikes(post?.likes);
    }, [post]);
    return (
        <Container>
            {loading ? (
                <LoadingAnimation />
            ) : (
                <DisplayPost
                    postType={post?.postType}
                    url={post?.url?.postUrl}
                    profilePic={post?.user?.profilePic?.url}
                    username={post?.user?.username}
                    caption={post?.caption}
                    setCommentCount={22}
                    setComments={setComments}
                    setPostLikes={setPostLikes}
                    postID={postID}
                    bookmarks={bookmarks}
                    likes={likes}
                    comments={comments}
                />
            )}
        </Container>
    );
};

export default Post;
