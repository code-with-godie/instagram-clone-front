import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactDom from 'react-dom';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
const Wrapper = styled.section`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 666;
    padding: ${props => !props.full && '0.5px'};
    background: ${props => props.bg};
    &.center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .close {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .close .icon {
        color: white;
        font-size: 2rem;
    }
`;
const Model = ({
    children,
    bg,
    center,
    showClose,
    openModel,
    closeUsingParent,
    full,
}) => {
    const handleClick = () => {
        closeUsingParent && openModel(false);
    };
    return ReactDom.createPortal(
        <Wrapper
            bg={bg}
            className={center && 'center'}
            full={full}
            onClick={handleClick}
        >
            {showClose && (
                <IconButton
                    className='close'
                    onClick={e => openModel(false)}
                >
                    {' '}
                    <Close className='icon' />{' '}
                </IconButton>
            )}
            {children}
        </Wrapper>,
        document.getElementById('model')
    );
};

export default Model;
