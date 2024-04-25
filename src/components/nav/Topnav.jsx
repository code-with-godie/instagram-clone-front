import React from 'react';
import styled from 'styled-components';
import logoOne from '../../assets/logoOne.png';
import { Search } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
  width: 100%;
  .fav {
    transition: all 200ms;
    font-size: 1.7rem;
    color: ${props => props.theme.border};
  }
  .fav:hover {
    transform: scale(1.1);
  }
`;
const LogoContainer = styled.div`
  flex: 1;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border-radius: 0.6rem;
  background-color: ${props => props.theme.border};
  width: 100%;
  max-width: 250px;
  .icon {
    color: ${props => props.theme.primary_3};
  }
`;
const Logo = styled.img`
  max-width: 90px;
  @media screen and (min-width: 500px) {
    max-width: auto !important;
  }
`;
const Input = styled.input`
  flex: 1;
  font-family: 'Poppins', sans-serif;
  background: transparent;
  border: none;
  outline: none;
  min-width: 0 !important;
  ::placeholder {
    color: ${props => props.theme.primary_3};
  }
`;
const Topnav = ({ setOpenNotofication }) => {
  return (
    <Container className='topnav'>
      <LogoContainer>
        <Link to='/'>
          <Logo src={logoOne} />
        </Link>
      </LogoContainer>
      <InputContainer>
        <Search className='icon' />
        <Input placeholder='Search...' />
      </InputContainer>
      <IconButton onClick={() => setOpenNotofication(true)}>
        <FavoriteBorderIcon className='fav' />
      </IconButton>
    </Container>
  );
};

export default Topnav;
