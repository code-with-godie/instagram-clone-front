import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Title = styled.h3`
    color: ${props => props.theme.text_semi_black};
    text-transform: capitalize;
    padding: 0.5rem;
`;
const Description = styled.p`
    font-size: 1rem;
    border-radius: 0.5rem;
    padding: 1rem;
    color: ${props => props.theme.text_semi_black};
    font-weight: 100;
    :hover {
        background: ${props => props.theme.text_gray_2};
        color: ${props => props.theme.bg_primary};
    }
`;
const AccountSettings = () => {
    return (
        <Container>
            <Title>Settings</Title>
            <Description>Edit profile</Description>
            <Description>Professinal account</Description>
            <Description>Language preferences</Description>
            <Description>Apps and websites</Description>
            <Description>Email notification</Description>
            <Description>Push notification</Description>
            <Description>What you see</Description>
            <Description>Who can see your content</Description>
            <Description>How other interact with you</Description>
            <Description>Supervison</Description>
            <Description>Help</Description>
            <Description>Subscription</Description>
            <Description>Switch to personal account</Description>
        </Container>
    );
};

export default AccountSettings;
