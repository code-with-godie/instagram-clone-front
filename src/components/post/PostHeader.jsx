import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MoreHoriz } from '@mui/icons-material'
import {format} from 'timeago.js'
import Model from '../../components/models/Model'
import PostOptions from './PostOptions'
const Container = styled.div`
display: flex;
padding:.5rem 0;
color: ${props => props.theme.text_primary};
.icon{
  color: ${props => props.theme.text_primary};

}
`
const ProfileContainer = styled.div`
flex: 1;
display: flex;
align-items: center;
gap:.5rem;
.profile{
        width: 50px;
        height: 50px;
        border-top:2px solid #FE016A;
        border-right:2px solid #D600BE;
        border-bottom:2px solid #FFC500;
        border-left:2px solid #FF3938;
    }
`
const Username= styled.h3`
font-size:.95rem;
`
const Dot= styled.div`
padding:.1rem;
background-color: ${props => props.theme.primary_2};
border-radius:50%;
`
const Time= styled.p`
font-family:'Poppins',sans-serif;
font-size:.8rem;
letter-spacing:1px;
`
const PostHeader = ({username,profilePic,date,_id,postID}) => {
  const navigate = useNavigate();
  const [showModel,setShowModel] = useState(false);
  const handleClick = ()=>{
    navigate(`/profile/${username}`,{state:{_id}})
  }
 
  return (
    <Container>
      <ProfileContainer>
      <IconButton onClick={handleClick} >
        <Avatar className='profile' alt={username} src={profilePic} />
      </IconButton>
      <Username>{username}</Username>
      <Dot/>
      <Time> {format(date)} </Time>
      </ProfileContainer>
      <IconButton onClick={e => setShowModel(true)} > <MoreHoriz className='icon' /> </IconButton>
      {showModel && <Model center bg={`#00000035`} ><PostOptions userID={_id} handleModel =  {setShowModel} username={username} postID ={postID} profilePic={profilePic} /></Model>}
    </Container>
  )
}

export default PostHeader