import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: column;
gap:1rem;
padding:1rem .5rem .5rem .5rem;
`
const TopContainer = styled.div`
display: flex;
gap:.5rem;
flex-wrap: wrap;
`
const Label = styled.div`
    font-weight: 200;
    color: ${props => props.theme.text_white_3};
    text-transform: capitalize;
    font-size:.9rem;

`
const BottomContainer = styled.div``
const Footer = () => {
  return (
    <Container>
        <TopContainer>
            <Label>about .</Label>
            <Label>help .</Label>
            <Label>press .</Label>
            <Label>API .</Label>
            <Label>jobs .</Label>
            <Label>privacy .</Label>
            <Label>terms .</Label>
            <Label>location .</Label>
            <Label>language .</Label>
            <Label>godie verified</Label>
        </TopContainer>
        <BottomContainer>
            <Label>&copy; {new Date().getFullYear()} INSTAGRAM FROM GODIE </Label>
        </BottomContainer>
    </Container>
  )
}

export default Footer