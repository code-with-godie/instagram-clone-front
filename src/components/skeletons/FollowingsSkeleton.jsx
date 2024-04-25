import React from 'react';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem;
  overflow: auto;
  /* margin: 0 auto; */
  .account {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  @media screen and (min-width: 768px) {
    .account {
      width: 50px;
      height: 50px;
    }
  }
`;

const PostSkeleton = ({ counter }) => {
  const { darkMode } = useAppContext();
  return (
    <Wrapper>
      {Array(counter).fill(
        <Skeleton
          className='account'
          animation='wave'
          variant='circular'
          sx={{
            bgcolor: `${darkMode && 'white'}`,
          }}
        />
      )}
    </Wrapper>
  );
};

export default PostSkeleton;
