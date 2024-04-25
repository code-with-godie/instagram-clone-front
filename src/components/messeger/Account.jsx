import { Avatar, IconButton, Radio } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const Description = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.1rem;
`;
const Name = styled.p`
  /* font-family: 'Poppins',sans-serif; */
  color: ${props => props.theme.text_primary};
  font-size: 0.9rem;
`;
const UserName = styled.p`
  font-size: 0.8rem;
  font-weight: 200;
  /* font-family: 'Poppins', sans-serif; */
  color: ${props => props.theme.text_gray_1};
`;
const Account = ({ profilePic, username, name, setSelected, _id }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(prev => !prev);
  };
  useEffect(() => {
    if (checked) {
      setSelected({ profilePic, username, name, _id });
    } else {
      setSelected(null);
    }
  }, [checked]);
  return (
    <Container>
      <Avatar src={profilePic?.url} />
      <Description>
        <Name> {name} </Name>
        <UserName> {username} </UserName>
      </Description>
      <IconButton onClick={handleChange}>
        <Radio
          checked={checked}
          //   onChange={handleChange}
        />
      </IconButton>
    </Container>
  );
};

export default Account;
