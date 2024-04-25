import React from 'react';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.3rem;
  overflow: auto;
  /* margin: 0 auto; */
  .account {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex: 1 0 90%;
  gap: 0.3rem;
  .video {
    flex: 1;
    height: 100%;
  }
  .control {
    width: 50px;
    height: 100%;
  }
`;

const ReelSkeleton = ({ counter }) => {
  const { darkMode } = useAppContext();
  return (
    <Wrapper>
      {Array(counter).fill(
        <Container>
          <Skeleton
            className='video'
            animation='wave'
            variant='rounded'
            sx={{
              bgcolor: `${darkMode && 'white'}`,
            }}
          />
          <Skeleton
            className='control'
            animation='wave'
            variant='rounded'
            sx={{
              bgcolor: `${darkMode && 'white'}`,
            }}
          />
        </Container>
      )}
    </Wrapper>
  );
};

export default ReelSkeleton;
