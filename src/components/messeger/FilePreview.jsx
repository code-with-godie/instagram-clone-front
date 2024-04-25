import React from 'react';
import styled from 'styled-components';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
const Container = styled.div`
    position: absolute;
    width: 100vw;
    max-width: 200px;
    height: 250px;
    bottom: 110%;
    left: 0px;
    border-radius: 0.5rem;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* background: ${props => props.theme.text_primary}; */

    .icon {
        position: absolute;
        z-index: 2000;
        .btn {
            color: ${props => props.theme.bg_primary};
        }
    }
`;
const FilePreview = ({ type, url, close }) => {
    return (
        <Container>
            <IconButton
                className='icon'
                onClick={close}
            >
                <Close className='btn' />
            </IconButton>
            {type === 'video' ? (
                <VideoPreview url={url} />
            ) : (
                <ImagePreview url={url} />
            )}
        </Container>
    );
};

export default FilePreview;
