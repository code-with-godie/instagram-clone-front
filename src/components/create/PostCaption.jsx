import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import emoji from '../../assets/emoji.svg';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';
import { useAppContext } from '../../context/AppContext';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
const Container = styled.div`
    flex: 1;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    position: relative;
`;
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .profile {
        width: 30px;
        height: 30px;
    }
`;
const UserName = styled.h3`
    font-size: 0.9rem;
    cursor: pointer;
    color: ${props => props.theme.text_semi_black};
`;
const CaptionInput = styled.textarea`
    flex: 1;
    resize: none;
    border: none;
    padding: 0.5rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    outline: none;
    transition: all 500ms;
    background: transparent;
    /* border: 1px solid ${props => props.theme.text_primary}; */
    color: ${props => props.theme.text_semi_black};
    ::placeholder {
        color: ${props => props.theme.text_semi_black};
    }
    @media screen and (min-width: 768px) {
        :focus {
            min-height: 100px;
        }
    }
`;
const CaptionControlContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .emoji {
        opacity: 1;
    }
`;
const Emoji = styled.img``;
const CaptionCounter = styled.p`
    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.text_gray_1};
`;
const Option = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${props => props.theme.text_gray_2};
    color: #000000d7;
    color: ${props => props.theme.text_semi_black};
    padding: 0.5rem;
    font-family: 'Poppins', sans-serif;
    :hover {
        background-color: ${props => props.theme.text_gray_2};
        color: ${props => props.theme.bg_primary};
        cursor: pointer;
    }
    .icons {
        font-size: 1.3rem;
        cursor: pointer;
    }
`;
const PostCaption = ({ caption, handleCaption }) => {
    const {
        user: {
            username,
            profilePic: { url },
        },
    } = useAppContext();
    const limit = 2200;
    const [showPicker, setShowPicker] = useState(false);
    const handleEmoji = emojiData => {
        handleCaption(prev => prev + emojiData?.emoji);
    };
    return (
        <Container>
            <ProfileContainer>
                <IconButton>
                    <Avatar
                        className='profile'
                        alt={username}
                        src={url}
                    />
                </IconButton>
                <UserName> {username} </UserName>
            </ProfileContainer>
            <CaptionInput
                placeholder='Write a caption'
                onFocus={e => setShowPicker(false)}
                value={caption}
                onChange={e => handleCaption(e.target.value)}
                disabled={caption.length >= limit}
            />
            <CaptionControlContainer>
                <IconButton
                    className='emoji'
                    onClick={e => setShowPicker(prev => !prev)}
                >
                    {/* <Emoji src={emoji} />{' '} */}
                    😁
                </IconButton>
                <CaptionCounter>
                    {' '}
                    {`${caption.length} / ${limit} `}
                </CaptionCounter>
            </CaptionControlContainer>
            <Option>
                Add a location <GoLocation className='icons' />{' '}
            </Option>
            <Option>
                Acessibilty <MdOutlineKeyboardArrowDown className='icons' />{' '}
            </Option>
            <Option>
                Advanced Settings{' '}
                <MdOutlineKeyboardArrowDown className='icons' />
            </Option>
            <EmojiPicker
                showPicker={showPicker}
                right
                handleEmoji={handleEmoji}
            />
        </Container>
    );
};

export default PostCaption;
