import React from 'react';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  max-width: 500px;
`;
const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 80vh;
  flex-shrink: 0;
  gap: 0.3rem;
  .profile {
    width: 40px;
    height: 40px;
  }
  @media screen and (min-width: 768px) {
    .profile {
      width: 50px;
      height: 50px;
    }
  }
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .header {
    flex: 1;
    height: 100%;
  }
`;
const PostContent = styled.div`
  flex: 1;
  display: flex;
  .content {
    flex: 1;
    height: 100%;
  }
`;
const PostFooter = styled.div`
  display: flex;
  .footer {
    flex: 1;
    height: 40px;
  }
`;

const PostSkeleton = ({ counter }) => {
  const { darkMode } = useAppContext();
  return (
    <Wrapper>
      {Array(counter).fill(
        <Container>
          <PostHeader>
            <Skeleton
              className='profile'
              animation='wave'
              variant='circular'
              sx={{
                bgcolor: `${darkMode && 'white'}`,
              }}
            />
            <Skeleton
              className='header'
              animation='wave'
              variant='rectangular'
              sx={{
                bgcolor: `${darkMode && 'white'}`,
              }}
            />
          </PostHeader>
          <PostContent>
            <Skeleton
              className='content'
              animation='wave'
              variant='rectangular'
              sx={{
                bgcolor: `${darkMode && 'white'}`,
              }}
            />
          </PostContent>
          <PostFooter>
            <Skeleton
              className='footer'
              animation='wave'
              variant='rectangular'
              sx={{
                bgcolor: `${darkMode && 'white'}`,
              }}
            />
          </PostFooter>
        </Container>
      )}
    </Wrapper>
  );
};

export default PostSkeleton;
