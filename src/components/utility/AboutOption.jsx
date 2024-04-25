import {
    CalendarMonth,
    LocationCityOutlined,
    LocationOffRounded,
    People,
    Person,
    PersonOutline,
} from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem;
    .profile {
        width: 100px;
        height: 100px;
    }
`;
const Username = styled.h4`
    color: ${props => props.theme.text_semi_black};
`;
const DescriptionContainer = styled.div`
    padding: 0 2rem 1rem 2rem;
`;
const Description = styled.p`
    font-size: 0.9rem;
    font-family: 'Lora', sans-serif;
    color: ${props => props.theme.text_gray_1};
`;
const OptionContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    .icon {
        font-size: 1.7rem;
        color: ${props => props.theme.text_gray_1};
    }
`;
const Option = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const OptionLabel = styled.p`
    font-family: 'Lora', sans-serif;
    color: ${props => props.theme.text_semi_black};
`;
const OptionLabelActual = styled(OptionLabel)`
    font-size: 0.9rem;
    color: ${props => props.theme.text_gray_1};
`;
const Close = styled.p`
    padding: 0.7rem;
    text-align: center;
    font-family: 'Lora', sans-serif;
    text-transform: capitalize;
    cursor: pointer;
    color: #101010e5;
    color: ${props => props.theme.text_semi_black};
    border-top: 1px solid ${props => props.theme.border};
`;
const AboutOption = ({ handleAbout, username, url }) => {
    return (
        <Container>
            <ProfileContainer>
                <Avatar
                    className='profile'
                    alt={username}
                    src={url}
                />
                <Username> {username} </Username>
            </ProfileContainer>
            <DescriptionContainer>
                <Description>
                    to help keep our community authentic we are showing
                    information about account on instagram
                </Description>
            </DescriptionContainer>
            <OptionContainer>
                <IconButton>
                    <CalendarMonth className='icon' />{' '}
                </IconButton>
                <Option>
                    <OptionLabel>Date joined</OptionLabel>
                    <OptionLabelActual>march</OptionLabelActual>
                </Option>
            </OptionContainer>
            <OptionContainer>
                <IconButton>
                    <LocationOffRounded className='icon' />{' '}
                </IconButton>
                <Option>
                    <OptionLabel>Accout based in</OptionLabel>
                    <OptionLabelActual>kenya</OptionLabelActual>
                </Option>
            </OptionContainer>
            {/* <OptionContainer>
            <IconButton><PersonOutline className='icon' /> </IconButton>
        </OptionContainer>
        <OptionContainer>
            <IconButton><People className='icon' /> </IconButton>
        </OptionContainer> */}
            <Close onClick={e => handleAbout(false)}> cancel </Close>
        </Container>
    );
};

export default AboutOption;
