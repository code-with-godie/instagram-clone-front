import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../post/Post';
import Followings from './Followings';
const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  width: 100%;
  max-width: 600px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
const Feeds = ({ posts }) => {
  const [observer, setObserver] = useState(false);
  const [muted, setMuted] = useState(false);

  const createObserver = () => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target?.paused && entry.target?.play();
          } else {
            !entry.target?.paused && entry.target?.pause();
          }
        });
      },
      { threshold: 0.75 }
    );
    return observer;
  };
  useEffect(() => {
    const observer = createObserver();
    setObserver(observer);
  }, []);
  return (
    <Wrapper>
      <Followings />
      <Container>
        {posts.map(post => (
          <Post
            key={post._id}
            observer={observer}
            muted={muted}
            setMuted={setMuted}
            {...post}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Feeds;
