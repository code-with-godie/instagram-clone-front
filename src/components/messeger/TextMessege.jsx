import React from 'react';
import styled from 'styled-components';

const Content = styled.p`
    background-color: ${props => (props.mine ? '#f0f2f5' : ' #1b74e4')};
    color: ${props => !props.mine && '#ffffff'};
    padding: 0.5rem;
    border-radius: 1rem;
`;
const TextMessege = ({ messege, mine }) => {
    return (
        <Content mine={mine}>
            {' '}
            {`${
                messege?.length > 700
                    ? `${messege.substring(0, 700)}...`
                    : `${messege}`
            }`}{' '}
        </Content>
    );
};

export default TextMessege;
