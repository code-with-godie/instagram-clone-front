import React from 'react'
import styled from 'styled-components'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`
const Video = styled.video`
width: 100%;
height: 100%;
object-fit: cover;
`
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Slide = ({postType,url,crop}) => {
  if(crop){
    return(
      <TransformWrapper>
        <TransformComponent>
        {
            postType === 'video' ? <Video src={url} controls /> : <Image src={url} />
        }
        </TransformComponent>
      </TransformWrapper>
    )
  }

  return (
    <Container>
        {
            postType === 'video' ? <Video src={url} controls /> : <Image src={url} />
        }
    </Container>
  )
}

export default Slide