import React from 'react';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  gap: 0.5rem;
  padding: 0.3rem;
  overflow: auto;
  /* margin: 0 auto; */
  .comment {
    width: 100%;
    height: 40px;
    flex-shrink: 0;
  }
`;

const CommentInputSkeleton = () => {
  const { darkMode } = useAppContext();
  return (
    <Wrapper>
      <Skeleton
        className='comment'
        animation='wave'
        variant='text'
        sx={{
          bgcolor: `${darkMode && 'white'}`,
        }}
      />
    </Wrapper>
  );
};

export default CommentInputSkeleton;
