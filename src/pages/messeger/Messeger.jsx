import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidenav from '../../components/nav/Sidenav';
import Messenger from '../../components/messeger/Messenger';

const Container = styled.section`
    display: flex;
    height: 100%;
`;
const Left = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
        padding: 0.5rem;
        border-right: 1px solid #dbdbdb;
    }
    @media screen and (min-width: 1300px) {
        flex: 1;
    }
`;
const Right = styled.div`
    flex: 4.3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    background-color: #fafafa;
`;
const Messeger = () => {
    useEffect(() => {
        const prev = document.title;
        document.title = 'Inbox . Chats';
        return () => {
            document.title = prev;
        };
    }, []);
    return (
        <Container>
            <Left>
                <Sidenav />
            </Left>
            <Right>
                <Messenger />
            </Right>
        </Container>
    );
};

export default Messeger;
