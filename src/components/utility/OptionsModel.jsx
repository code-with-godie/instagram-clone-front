import React, { useState } from 'react'
import Model from '../../components/models/Model'

const OptionsModel = ({children}) => {
    return  <Model bg={`rgba(0, 0, 0, 0.178)`} > {children} </Model>
}

export default OptionsModel