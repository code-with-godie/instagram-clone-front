import React, { useState } from 'react';
import styled from 'styled-components';
import emoji from '../../assets/emoji.svg';
import { postData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContext';
import EmojiPicker from '../EmojiPicker/EmojiPicker';

const Container = styled.form`
    display: flex;
    gap: 0.3rem;
    position: relative;
    padding: 0.5rem;
    gap: 0.5rem;
    &.border {
        border-top: 1px solid ${props => props.theme.input.border};
    }
`;
const Input = styled.input`
    flex: 1;
    background: transparent;
    outline: none;
    padding: 0.2rem;
    font-family: 'Poppins', sans-serif;
    border: none;
    color: ${props => props.theme.input.color};
    ::placeholder {
        color: ${props => props.theme.input.color};
    }
`;
const Emoji = styled.img`
    width: 20px;
    height: 20px;
    color: gray;
    fill: ${props => props.theme.primary_2};
    cursor: pointer;
    object-fit: contain;
`;
const Send = styled.button`
    text-transform: capitalize;
    color: ${props => props.theme.btn.color};
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
    font-size: 0.9rem;
    font-weight: 600;
`;

const PostCommentInput = ({ direction, postID, setComments }) => {
    const {
        token,
        user: { username },
    } = useAppContext();
    const [comment, setComment] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const handleEmoji = emojiData => {
        setComment(prev => prev + emojiData.emoji);
    };

    const handleComment = async e => {
        e.preventDefault();
        try {
            const res = await postData(
                `/comments/${postID}`,
                { comment },
                token
            );
            if (res.success) {
                setComment('');
                setComments(prev => [res.comment, ...prev]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container
            className={direction === 'start' && 'border'}
            onSubmit={handleComment}
        >
            {direction === 'start' && <Emoji src={emoji} />}
            <Input
                placeholder='Add a comment...'
                value={comment}
                onFocus={() => setShowPicker(false)}
                onChange={e => setComment(e.target.value)}
            />

            {direction === 'end' && (
                <Emoji
                    src={emoji}
                    onClick={e => setShowPicker(prev => !prev)}
                />
            )}
            {comment && <Send>post</Send>}
            {/* <EmojiPicker
                showPicker={showPicker}
                handleEmoji={handleEmoji}
            /> */}
        </Container>
    );
};

export default PostCommentInput;
