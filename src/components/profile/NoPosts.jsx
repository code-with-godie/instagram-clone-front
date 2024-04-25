import React from 'react';
import styled from 'styled-components';
import tagged from '../../assets/tagged.png';

const Container = styled.div`
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    align-self: flex-end;
`;
const Image = styled.img``;
const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: bold;
    color: ${props => props.theme.text_black};
`;
const Description = styled.p`
    font-size: 0.9rem;
`;
const NoPosts = ({ img, title, description }) => {
    return (
        <Container>
            <Image src={tagged} />
            <Title> {title} </Title>
            <Description> {description} </Description>
        </Container>
    );
};

export default NoPosts;
