import React, { useCallback } from 'react'
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: 1;
`
const DropZone = ({children}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <Container {...getRootProps()} > 
        <input {...getInputProps()} hidden  />
        {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
        {children}
        </Container>
  )
}

export default DropZone