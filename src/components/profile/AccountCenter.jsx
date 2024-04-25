import {
    AdsClickOutlined,
    PaymentOutlined,
    PersonOutline,
    Security,
} from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    width: 100%;
    border: 1px solid ${props => props.theme.main_white};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 0 5px 3px rgba(221, 221, 221, 0.2);
    padding: 0.5rem;
    border-radius: 1rem;
`;
const Heading = styled.h3`
    color: ${props => props.theme.text_semi_black};
`;
const Title = styled.h4`
    color: ${props => props.theme.text_semi_black};
    text-transform: capitalize;
`;
const Description = styled.p`
    font-size: ${props => (props.blue ? '.9rem' : '0.8rem')};

    color: ${props =>
        props.blue ? props.theme.blue : props.theme.text_gray_1};
    font-weight: 100;
    :hover {
        text-decoration: ${props => props.blue && 'underline'};
        cursor: ${props => props.blue && 'pointer'};
    }
`;
const Control = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .icon {
        color: ${props => props.theme.text_gray_1};
    }
`;
const AccountCenter = () => {
    return (
        <Container>
            <Heading>Godie</Heading>
            <Title>account center</Title>
            <Description>
                Manage your connnected experience and account settings across
                Meta technologies
            </Description>
            <Control>
                <PersonOutline className='icon' />
                <Description>Personal details</Description>
            </Control>
            <Control>
                <Security className='icon' />
                <Description>Password and Security</Description>
            </Control>
            <Control>
                <AdsClickOutlined className='icon' />
                <Description>Ad Preferences</Description>
            </Control>
            <Control>
                <PaymentOutlined className='icon' />
                <Description>Payment</Description>
            </Control>
            <Description blue>See more in Account Center</Description>
        </Container>
    );
};

export default AccountCenter;
