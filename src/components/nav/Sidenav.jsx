import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Badge, IconButton } from '@mui/material';
import { FavoriteBorderOutlined, Home } from '@mui/icons-material';
import { RiMessengerLine } from 'react-icons/ri';
import { MdOutlineExplore } from 'react-icons/md';
import { CgAddR } from 'react-icons/cg';
import { AiOutlinePlaySquare } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logoOne from '../../assets/logoOne.png';
import logoTwo from '../../assets/logoTwo.png';
import Model from '../models/Model';
import Options from '../utility/Options';
import { useAppContext } from '../../context/AppContext';
import CreatePost from '../create/CreatePost';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: start;
`;
const Container = styled.ul`
  flex: 6;
  align-self: stretch;
  padding: 0.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
  color: ${props => props.theme.text_primary};
  .icon {
    font-size: 1.9rem;
    transition: all 300ms;
    cursor: pointer;
  }
  .avator {
    width: 30px;
    height: 30px;
  }
  .link {
    text-decoration: none;
    color: inherit;
    display: flex;
    gap: 0.5em;
    cursor: pointer;
    align-items: center;
    padding: 0.3rem;
    border-radius: 0.5rem;
    &:hover {
      background-color: #f2f2f2;
      /* color: ${props => props.theme.bg_primary}; */
    }
    &:hover .icon {
      transform: scale(1.1);
    }
    .icon.active {
      fill: ${props => props.theme.text_primary};
    }
  }
`;
const IconLabel = styled.p`
  font-family: 'Popins', sans-serif;
  text-transform: capitalize;
  /* color: ${props => props.theme.text_primary}; */
  letter-spacing: 0.5px;
  display: none;
  @media screen and (min-width: 1300px) {
    display: block;
    &.hide {
      display: none;
    }
  }
`;
const LogoContainer = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;
const Logo = styled.img`
  max-width: ${props => (props.small ? '30px' : '120px')};
  height: auto;
  transition: all 500ms;
  opacity: ${props => (props.small ? 1 : 0)};
  position: absolute;
  @media screen and (min-width: 1300px) {
    opacity: ${props => (props.small ? 0 : 1)};
    &.hide {
      /* opacity: ${props => (props.small ? 0 : 1)}; */
      opacity: ${props => (props.small ? 1 : 0)};
    }
  }
`;
const OptionsContainer = styled.div`
  padding: 0.5rem;
  flex: 2;
  display: flex;
  align-items: flex-end;
  .icon {
    color: ${props => props.theme.text_primary};
  }
`;
const Sidenav = ({ handlePosts, openNotification, setOpenNotofication }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const {
    user: {
      username,
      profilePic: { url },
      _id,
    },
    socket,
    updateNotification,
    notifications,
  } = useAppContext();
  const [notCount, setNotCount] = useState(notifications?.length);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${username}`, { state: { _id } });
  };
  useEffect(() => {
    socket?.emit('GET_NOTIFICATIONS', _id);
    socket?.on('NOTIFICATIONS', notifications => {
      updateNotification(notifications);
    });
  }, [socket]);
  useEffect(() => {
    setNotCount(notifications?.length);
  }, [notifications]);
  return (
    <Wrapper>
      <LogoContainer>
        <Link
          to='/'
          className='link'
        >
          <Logo
            className={openNotification && 'hide'}
            src={logoOne}
          />
          <Logo
            className={openNotification && 'hide'}
            src={logoTwo}
            small
          />
        </Link>
      </LogoContainer>
      <Container>
        <Link
          className='link'
          to='/'
        >
          <Home className='icon' />
          <IconLabel className={openNotification && 'hide'}>home</IconLabel>
        </Link>
        <Link className='link'>
          <MdOutlineExplore className='icon' />
          <IconLabel className={openNotification && 'hide'}>explore</IconLabel>
        </Link>
        <Link
          className='link'
          to='/reels'
        >
          <AiOutlinePlaySquare className='icon' />
          <IconLabel className={openNotification && 'hide'}>reels</IconLabel>
        </Link>
        <Link
          className='link'
          to='/direct/inbox'
        >
          <RiMessengerLine className='icon' />
          <IconLabel className={openNotification && 'hide'}>messeger</IconLabel>
        </Link>
        <div
          onClick={() => setOpenNotofication(prev => !prev)}
          className='link'
        >
          <Badge
            badgeContent={notCount.toString()}
            color='error'
          >
            <FavoriteBorderOutlined
              className={`${openNotification ? 'icon active' : 'icon'}`}
            />
          </Badge>
          <IconLabel className={openNotification && 'hide'}>
            notifications
          </IconLabel>
        </div>
        <div
          className='link'
          onClick={e => setShowModel(true)}
        >
          <CgAddR className='icon' />
          <IconLabel className={openNotification && 'hide'}>create</IconLabel>
        </div>
        <div
          className='link'
          onClick={handleClick}
        >
          <Avatar
            className='avator'
            alt={username}
            src={url}
          />
          <IconLabel className={openNotification && 'hide'}>profile</IconLabel>
        </div>
      </Container>
      <OptionsContainer>
        <IconButton onClick={e => setOpenOptions(prev => !prev)}>
          <FaBars className='icon' />
        </IconButton>
      </OptionsContainer>
      {openOptions && (
        <Model
          closeUsingParent
          openModel={setOpenOptions}
        >
          <Options />
        </Model>
      )}
      {showModel && (
        <Model
          bg='rgba(0, 0, 0, 0.444)'
          showClose
          openModel={setShowModel}
          center
        >
          <CreatePost
            handlePosts={handlePosts}
            handleModel={setShowModel}
          />
        </Model>
      )}
    </Wrapper>
  );
};

export default Sidenav;
