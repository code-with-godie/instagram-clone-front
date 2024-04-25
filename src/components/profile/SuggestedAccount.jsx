import { Close } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex:0 0 150px;
    border-radius: .5rem;
    border: 1px solid #DBDBDB;


`
const CloseContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding:.3rem;
    .close{
        color: #777777;
        cursor: pointer;
        font-size:1rem;
    }
`
const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
`
const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
    align-items: center;
`
const Username = styled.p`
font-family: 'Lora',sans-serif;
`
const Name = styled.p`
font-family: 'Lora',sans-serif;
font-size:.9rem;
color: ${props => props.theme.primary_2};

white-space: nowrap;
overflow: hidden;
`
const FollowButton = styled.button`
color: white;
font-family:'Lora',sans-serif;
font-size: .9rem;
text-transform: capitalize;
font-weight: bold;
outline: none;
border: none;
border-radius:.5rem;
padding:.5rem 1rem;
background: #0095F6;
cursor: pointer;
`
const SuggestedAccount = ({name,profilePic,username}) => {
  return (
    <Container>
        <CloseContainer><Close className='close'   /></CloseContainer>
        <ProfileContainer> <IconButton><Avatar alt={name} src={profilePic} /> </IconButton></ProfileContainer>
        <DescriptionContainer>
            <Username> {username} </Username>
            <Name> {name} </Name>
            <FollowButton>follow</FollowButton>
        </DescriptionContainer>
    </Container>
  )
}

export default SuggestedAccount