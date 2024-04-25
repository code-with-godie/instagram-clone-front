import React, { useEffect } from 'react'
import styled from 'styled-components'
import SuggestedAccount from './SuggestedAccount'

import { useState } from 'react'
import { useFetch } from '../../api/useFetch'
import LoadingAnimation from '../loading/LoadingAnimation'
import Model  from '../models/Model'
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 230px;
`
const HeadingContainer = styled.div`
    padding:.5rem;
    display: flex;
    justify-content: space-between;
`
const Title = styled.p`
color: ${props => props.theme.primary_2};
font-family: 'Lora', sans-serif;
text-transform: capitalize;
`
const More = styled(Title)`
color: ${props => props.theme.blue};
font-weight: bold;
cursor: pointer;
:hover{
    text-decoration: underline;
}
`
const Container  = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    overflow: auto;
    gap:.5rem;
    ::-webkit-scrollbar {
      display: none;
    }
`
const Suggested = () => {
    const [suggested,setSuggested] = useState([]);
    const [showModel,setShowModel] = useState(false);
    const {loading,error,data} = useFetch('/users');
    useEffect(()=>{
        data && setSuggested(data.users);
    },[data]);
  return (
    <>
    {
        loading ? <LoadingAnimation large />:
        showModel ? <Model center bg='rgba(0, 0, 0, 0.23)' showClose openModel={setShowModel} > <h1>model content</h1> </Model>:
    <Wrapper>
        <HeadingContainer>
            <Title>suggested</Title>
            <More onClick={e => setShowModel(true)} >sell all</More>
        </HeadingContainer>
    <Container>
        {
            suggested.map(suggest => <SuggestedAccount {...suggest} key={suggest._id} /> )
        }
    </Container>
        </Wrapper>
    }
    </>
  )
}

export default Suggested