import { IconButton } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {GrAdd} from 'react-icons/gr'
const Container = styled.div`
    position: absolute;
    padding:.5rem;
    border-radius:.5rem;
    background: #0000006b;
    bottom: 2.5rem;
    right:.5rem;
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    gap:.3rem;
    overflow: auto;

`
const AddContainer = styled.label`
    padding: 1rem;
    border: 1px solid white;
    border-radius: 50%;
    cursor: pointer;
`
const  ImageContainer = styled.div`
    width: 70px;
    height: 70px;
`
const  Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Pagination = ({files=[],handleFile}) => {
  return (
    <Container>
        {
            files.map((item,index) => <ImageContainer><Image src={item.url} key={index} /></ImageContainer>)
        }
        <AddContainer htmlFor='file' > <GrAdd/> </AddContainer>
        <input type='file' hidden name='file' id='file' onChange={handleFile} />
    </Container>
  )
}

export default Pagination