import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  height: 100%;
  background-color: white;
  z-index: 100;
  border-radius: 0 0.5rem 0.5rem 0;
  width: 100vw;
  left: 30%;
  transition: transform 300ms ease-in-out;
  transform: translateX(-100%);
  display: none;
  border: 1px solid #dbdbdb;
  @media screen and (min-width: 500px) {
    max-width: 300px;
  }
  &.show {
    display: flex;
    transform: translateX(0);
  }
`;
const Notifications = ({ openNotification }) => {
  return (
    <Container className={openNotification && 'show'}>Notifications</Container>
  );
};

export default Notifications;
