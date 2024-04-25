import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import emoji from '../../assets/emoji.svg';
import { postData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContext';
import { IconButton } from '@mui/material';
import { AttachFile, Mic } from '@mui/icons-material';
import FilePreview from './FilePreview';
import SmillingEmoji from '../EmojiPicker/EmojiPicker';
const Wrapper = styled.div`
  padding: 1rem;
`;
const Container = styled.form`
  position: relative;
  border: 1px solid #dbdbdb;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  .icon {
    color: ${props => props.theme.text_semi_black};
    cursor: pointer;
  }
`;
const Emoji = styled.img`
  cursor: pointer;
`;
const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
`;
const Send = styled.button`
  text-transform: capitalize;
  color: #1db9dc;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  font-size: 1rem;
`;
const ChatInput = ({
  setChats,
  roomID,
  receiverID,
  setRooms,
  setCurrentConversation,
}) => {
  const { openToast } = useAppContext();
  // const MAX_FILE_SIZE = 1024 * 10;
  const { token, socket } = useAppContext();
  const [messege, setMessege] = useState('');
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const handleFile = e => {
    const file = e.target.files[0];
    const type = file?.type.split('/')[0];
    const size = file?.size;
    // if (size > MAX_FILE_SIZE) {
    //     openToast('file too large');
    //     return;
    // }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setFile({ type, url: fileReader.result });
    };
  };
  const selectFile = () => {
    inputRef.current?.click();
  };

  const handleOtherUserMesseges = messege => {
    if (messege?.roomID === roomID) {
      setChats(prev => [...prev, messege]);
    }
  };
  const close = () => {
    setFile(null);
  };
  useEffect(() => {
    setFile(null);
    setMessege('');
  }, [roomID]);

  useEffect(() => {
    socket?.on('RECEIVE_MESSEGE', handleOtherUserMesseges);
    return () => {
      socket?.off('RECEIVE_MESSEGE', handleOtherUserMesseges);
    };
  }, [socket]);
  const handleSend = async e => {
    e.preventDefault();
    try {
      if (file || messege) {
        const res = await postData(
          '/messeges',
          {
            title: messege,
            receiverID,
            roomID,
            type: file?.type || 'text',
            url: file?.url || '',
          },
          token
        );
        if (res.success) {
          if (res?.room) {
            setCurrentConversation(prev => ({
              ...prev,
              roomID: res?.room?._id,
              mode: 'active',
            }));
            setRooms(prev => [res.room, ...prev]);
          }
          setChats(prev => [...prev, res.message]);
          socket?.emit('NEW_MESSEGE', res.message, receiverID);
          setMessege('');
          setFile(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <Container onSubmit={handleSend}>
        <input
          type='file'
          hidden
          onChange={handleFile}
          ref={inputRef}
        />
        {/* <SmillingEmoji /> */}
        <Emoji src={emoji} />
        <Input
          placeholder='message..'
          value={messege}
          onChange={e => setMessege(e.target.value)}
        />
        {(messege || file) && <Send type='submit'>send</Send>}

        <AttachFile
          onClick={selectFile}
          className='icon'
        />
        <Mic className='icon' />
        {file && (
          <FilePreview
            type={file.type}
            close={close}
            url={file.url}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default ChatInput;
