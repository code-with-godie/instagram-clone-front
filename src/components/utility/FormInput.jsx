import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
padding:.5rem;
border: 1px solid #FAFAFA;
outline: none;
border-radius:.3rem;
font-family: 'Poppins',sans-serif;
font-size:.8rem;
background-color: #FAFAFA;
border:1px solid #d2d2d2;
::placeholder{
    color: #989797;
}
`
const FormInput = ({placeholder,value,name,type,handlChange}) => {
  return (
    <Input 
    placeholder={placeholder} 
    value={value} type={type} 
    name={name} 
    onChange={handlChange} />
  )
}

export default FormInput