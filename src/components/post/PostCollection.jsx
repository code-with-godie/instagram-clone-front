import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import Slide from './Slide';
import 'swiper/css';
import 'swiper/css/pagination';
import SliderControl from './SliderControl';
import {TbBoxMultiple} from 'react-icons/tb'
import { IconButton } from '@mui/material';


const Container = styled.div`
height:${props => props.height  ? '400px' : '100%'};
width:${props => props.height  ? '300px' : '100%'};
.swiper{
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
        position: absolute;
        right:.5rem;
        z-index: 100;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
      }
      .top{
      top: 0.5rem;
    }
    .bottom{
      bottom: .5rem;
      background-color: #0000006e;
      z-index: 1000000;
    }
}
//change the color of the swiper pagination dots
.swiper-pagination-bullet-active {
     background-color: #ffffff !important;
}
`

const PostCollection = ({height,width,related=[],showControls,select,handlePagination ,crop}) => {
  return (
  <Container height={height} width={width} >
      <Swiper
    modules={[ Pagination,A11y]}
    spaceBetween={0}
    slidesPerView={1}
    pagination={{ clickable: true }}
    className='swiper'
  >
    {
        related.map(item =>  <SwiperSlide key={item.id} ><Slide crop={crop}  {...item} /></SwiperSlide> )
    }
    {
        showControls  && <SliderControl/> 
    }
    {
         select ? <IconButton className='icon bottom' onClick={e =>handlePagination(prev => !prev)}  ><TbBoxMultiple/></IconButton>: 
        <TbBoxMultiple className='icon top' />
    }
  </Swiper>
  </Container>

  )
}

export default PostCollection