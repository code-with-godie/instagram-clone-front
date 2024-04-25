import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;
const Title = styled.p`
    background-color: ${props => (props.mine ? '#f0f2f5' : ' #1b74e4')};
    color: ${props => !props.mine && '#ffffff'};
    padding: 0.5rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
`;
const Image = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: contain;
`;
const ImageMessege = ({ url, messege, mine }) => {
    return (
        <Container>
            <Image src={url?.source} />
            {messege?.length > 0 && (
                <Title mine={mine}>
                    {' '}
                    {`${
                        messege?.length > 700
                            ? `${messege.substring(0, 700)}...`
                            : `${messege}`
                    }`}{' '}
                </Title>
            )}
        </Container>
    );
};

export default ImageMessege;
