import React, { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
`;
const Title = styled.h3``;
const Description = styled.p``;
const AccountInfo = ({ followers, followings }) => {
    const [accountPost, setAccountPost] = useState([]);
    return (
        <Container>
            <Description>
                <Title>1111</Title>
                <Description>posts</Description>
            </Description>
            <Description>
                <Title> {followers?.length} </Title>
                <Description>followers</Description>
            </Description>
            <Description>
                <Title>{followings?.length}</Title>
                <Description>followings</Description>
            </Description>
        </Container>
    );
};

export default AccountInfo;
