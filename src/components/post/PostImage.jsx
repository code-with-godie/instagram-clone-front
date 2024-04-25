import React from 'react';
import styled from 'styled-components';
const Container = styled.img`
  max-width: 100%;
  height: ${props => (props.cover ? '100%' : ' auto')};
  width: ${props => props.cover && '100%'};
  object-fit: ${props => (props.cover ? 'cover' : 'contain')};
  max-height: 600px;
  &.model {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;
const PostImage = ({ url, cover, model }) => {
  return (
    <Container
      src={url}
      cover={cover}
      className={`${model && 'model'}`}
    />
  );
};

export default PostImage;
