import React from 'react'
import styled from 'styled-components'
import {MdKeyboardArrowLeft} from 'react-icons/md'
import {MdKeyboardArrowRight} from 'react-icons/md'
import { useSwiper } from 'swiper/react'
const Container = styled.div`
    z-index: 10;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding:.5rem;
`
const ButtonContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff6b;
    border: none;
    outline: none;
    padding:.2rem;
    border-radius:50%;
    font-size: 1.5rem;
    color: #000000cf;
    cursor: pointer;
`
const SliderControl = () => {
    const swiper = useSwiper();
  return (
    <Container>
        <ButtonContainer onClick={()=>swiper.slidePrev()} > <MdKeyboardArrowLeft/> </ButtonContainer>
        <ButtonContainer  onClick={()=>swiper.slideNext()} > <MdKeyboardArrowRight/> </ButtonContainer>
    </Container>
  )
}

export default SliderControl
