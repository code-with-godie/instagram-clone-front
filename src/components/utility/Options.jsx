import { BookmarkOutlined, Settings } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
position: absolute;
bottom:3.5rem;
width: 100%;
max-width: 200px;
display: flex;
flex-direction: column;
gap:.2rem;
`
const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:.5rem;
   box-shadow: 3px 3px 5px  gray;
   border-radius:.5rem;
   background-color: white;
   z-index: 10;
`
const Option = styled.div`
display: flex;
align-items: center;
gap:.5rem;
padding:.5rem;
cursor: pointer;
:hover{
    background-color: #f0f0f0be;
}
`
const OptionLabel = styled.p`
text-transform: capitalize;
font-family: 'Poppins',sans-serif;
`
const Options = () => {
  return (
    <Container>
        <OptionsContainer>
            <Option>
                <Settings/>
                <OptionLabel>save</OptionLabel>
            </Option>
            <Option>
                <BookmarkOutlined/>
                <OptionLabel>save</OptionLabel>
            </Option>
            <Option>
                <BookmarkOutlined/>
                <OptionLabel>save</OptionLabel>
            </Option>
            <Option>
                <BookmarkOutlined/>
                <OptionLabel>save</OptionLabel>
            </Option>
            <Option>
                <BookmarkOutlined/>
                <OptionLabel>save</OptionLabel>
            </Option>
        </OptionsContainer>
        <OptionsContainer>
        <Option>
                <OptionLabel>switch account</OptionLabel>
            </Option>
        </OptionsContainer>
        <OptionsContainer>
        <Option>
                <OptionLabel>logout</OptionLabel>
            </Option>
        </OptionsContainer>
    </Container>
  )
}

export default Options