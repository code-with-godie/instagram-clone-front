import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import PostCommentInput from './PostCommentInput';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
// import PostComment from './PostComment'
import AllComments from './AllComments';
import PostComment from './PostComment';
import CommentInputSkeleton from '../skeletons/CommentInputSkeleton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const CaptionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const MoreComments = styled.p`
  color: ${props => props.theme.text_primary};
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;

const UserName = styled.h4`
  color: ${props => props.theme.text_primary};
  font-family: 'Lora', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
const Comment = styled.p`
  display: flex;
  gap: 1rem;
  font-weight: 100;
  font-size: 0.9rem;
  color: ${props => props.theme.text_primary};
`;
const PostComments = ({
  caption,
  profilePic,
  username,
  url,
  postType,
  postID,
  likes,
  bookmarks,
  setPostLikes,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [displayComments, setDisplayComments] = useState([]);
  const { loading, data, error } = useFetch(`/comments/${postID}`);
  useEffect(() => {
    if (data) {
      setComments(data.comments);
    }
  }, [data]);

  useEffect(() => {
    setDisplayComments(comments.slice(0, 1));
    setCommentCount(comments.length);
  }, [comments]);

  if (loading) return <CommentInputSkeleton />;
  if (error) console.log(error);
  return (
    <Container>
      {caption && (
        <CaptionContainer>
          <UserName> {username} </UserName>
          <Comment> {caption} </Comment>
        </CaptionContainer>
      )}
      <CommentContainer>
        {displayComments.map(item => (
          <PostComment
            key={item._id}
            {...item}
          />
        ))}
      </CommentContainer>

      {comments.length > 2 && (
        <MoreComments onClick={e => setShowComments(true)}>
          {' '}
          {`view all ${commentCount} comments`}{' '}
        </MoreComments>
      )}

      <PostCommentInput
        postID={postID}
        direction='end'
        setComments={setComments}
      />

      {showComments && (
        <AllComments
          handleModel={setShowComments}
          postType={postType}
          url={url}
          setPostLikes={setPostLikes}
          profilePic={profilePic}
          username={username}
          caption={caption}
          setCommentCount={setCommentCount}
          handleCommnets={setDisplayComments}
          setComments={setComments}
          postID={postID}
          likes={likes}
          bookmarks={bookmarks}
          comments={comments}
        />
      )}
    </Container>
  );
};

export default PostComments;
