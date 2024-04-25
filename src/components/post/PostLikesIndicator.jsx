import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0.5rem;
`;
const Indicator = styled.h4`
    color: ${props => props.theme.text_semi_black};
`;
const PostLikesIndicator = ({ likes }) => {
    return (
        <Container>
            <Indicator>
                {' '}
                {likes && `${likes} ${likes === 1 ? 'like' : 'likes'}`}{' '}
            </Indicator>
        </Container>
    );
};

export default PostLikesIndicator;
