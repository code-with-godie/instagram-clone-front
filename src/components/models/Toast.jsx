import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 0.5rem;
    width: 100%;
    position: absolute;
    top: 2rem;
    display: flex;
    justify-content: center;
    z-index: 100000;
`;
const Container = styled.p`
    padding: 0.5rem;
    width: 90%;
    max-width: 400px;
    text-align: center;
    border-radius: 0.3rem;
    background-color: #e6e6e6db;
    color: #000000da;
    font-family: 'Poppins', sans-serif;
`;
const Toast = ({ messege, handleToast }) => {
    useEffect(() => {
        setTimeout(handleToast, 2000);
    }, []);
    return ReactDom.createPortal(
        <Wrapper>
            <Container> {messege} </Container>
        </Wrapper>,
        document.getElementById('model')
    );
};

export default Toast;
