import React from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
    /* border: 1px solid ${props => props.theme.border};
    background: ${props => props.theme.bg_primary}; */
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 300px;
    max-height: 0px;
    border-radius: 0.5rem;
    z-index: 100;
    bottom: 50px;
    display: none;
    right: 10px;
    transition: 200ms;
    overflow: auto;
    ::-webkit-scrollbar {
        height: 5px;
    }
    &.show {
        max-height: 350px;
        display: block;
    }
    &.right {
        right: 0;
        bottom: 200px;
    }
    .picker {
        width: 100%;
        height: 100%;
    }
    @media screen and (min-width: 768px) {
        &.right {
            right: 101%;
            bottom: 0;
        }
    }
`;
const EmojiPicker = ({ showPicker, handleEmoji, right }) => {
    const { darkMode } = useAppContext();

    return (
        <Container className={`${showPicker && 'show'} ${right && 'right'}`}>
            <Picker
                onEmojiClick={handleEmoji}
                className='picker'
                theme={darkMode ? 'dark' : 'light'}
                searchDisabled
            />
        </Container>
    );
};

export default EmojiPicker;
