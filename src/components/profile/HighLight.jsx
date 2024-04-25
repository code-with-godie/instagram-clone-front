import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;
const CoverImage = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
    @media screen and (min-width: 768px) {
        width: 60px;
        height: 60px;
    }
    @media screen and (min-width: 900px) {
        width: 70px;
        height: 70px;
    }
`;

const Description = styled.p`
    font-size: 1rem;
    color: ${props => props.theme.text_primary};
`;
const HighLight = ({ cover, description }) => {
    return (
        <Container>
            <CoverImage src={cover?.secure_url} />
            <Description> {description} </Description>
        </Container>
    );
};

export default HighLight;
