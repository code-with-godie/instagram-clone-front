import React from 'react';
import styled from 'styled-components';
import TextMessege from './TextMessege';
import ImageMessege from './ImageMessege';
import VideoMessege from './VideoMessege';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
    align-self: ${props => (props.mine ? 'flex-end' : 'flex-start')};

    max-width: 60%;
`;
const Messege = ({ title, type, senderID, messegeRef, url }) => {
    const {
        user: { _id: userID },
    } = useAppContext();
    let MyMessege = null;
    const mine = senderID === userID;
    switch (type) {
        case 'image':
            MyMessege = ImageMessege;
            break;
        case 'video':
            MyMessege = VideoMessege;
            break;
        default:
            MyMessege = TextMessege;
            break;
    }
    return (
        <Container
            mine={mine}
            ref={messegeRef}
        >
            <MyMessege
                mine={mine}
                messege={title}
                url={url}
            />
        </Container>
    );
};

export default Messege;
