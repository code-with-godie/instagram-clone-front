import React, { useState } from 'react'
import styled from 'styled-components'
import PostHeader from './PostHeader'
import PostCollection from '../post/PostCollection'
import Pagination from './Pagination'

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
`
const ImagesContainer = styled.div`
flex: 1;
`
const Image = styled.img`
max-width: auto;
height: 100%;
max-height: 250px;
object-fit: contain;
@media screen and (min-width:768px) {
        max-height: none; 
    }
`
const PostCrop = ({files,handleFile,setIndex,goBack}) => {
  const [showPagination,setShowPagination] = useState(false);
  return (
    <Container>
        <PostHeader title='Crop' next setIndex={setIndex} goBack={goBack} />
        <PostCollection height  showControls  related={files} select  handlePagination={setShowPagination} crop />
        {
          showPagination &&
        <Pagination files={files} handleFile={handleFile} />
        }
        
    </Container>
  )
}

export default PostCrop