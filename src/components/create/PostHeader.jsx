import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.border};
    .icon {
        color: ${props => props.theme.primary_2};
    }
`;
const Title = styled.h3`
    text-align: center;
    font-family: 'Popins', sans-serif;
    font-weight: 400;
    flex: 1;
    color: ${props => props.theme.text_semi_black};
`;
const ShareButton = styled.button`
    outline: none;
    background: transparent;
    border: none;
    color: ${props => props.theme.text_dark_blue};
    font-size: 1rem;
    text-transform: capitalize;
    cursor: pointer;
`;
const PostHeader = ({
    goBack,
    title,
    next,
    setIndex,
    handleUpload,
    loading,
}) => {
    return (
        <Container>
            <IconButton onClick={goBack}>
                <BiArrowBack className='icon' />
            </IconButton>
            <Title> {title} </Title>
            {next ? (
                <ShareButton onClick={e => setIndex(2)}>next</ShareButton>
            ) : (
                <ShareButton onClick={handleUpload}>
                    {loading ? <LoadingAnimation /> : 'share'}
                </ShareButton>
            )}
        </Container>
    );
};

export default PostHeader;
