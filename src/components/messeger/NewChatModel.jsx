import React, { useEffect, useState } from 'react';
import Model from '../models/Model';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import Account from './Account';
import { useFetch } from '../../api/useFetch';
import AccountsSkeleton from '../skeletons/AccountsSkeleton';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 0.5rem;
  height: 100%;
  max-height: 500px;
  background-color: ${props => props.theme.bg_primary};
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  padding: 0.3rem;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.border};
`;
const Title = styled.h3`
  flex: 1;
  text-align: center;
  color: ${props => props.theme.text_primary};
`;
const SearchContainer = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const InputDescription = styled.h3`
  color: ${props => props.theme.text_primary};
`;
const ChatsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`;
const Input = styled.input`
  font-size: 1.1rem;
  font-weight: 200;
  border: none;
  outline: none;
  background-color: transparent;
  min-width: 0 !important;
  flex: 1;
`;
const ButtonContainer = styled.div`
  display: flex;
  padding: 0.5rem;
`;
const Button = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  text-transform: capitalize;
  font-size: 1rem;
  color: ${props => props.theme.main_white};
  background-color: ${props => props.theme.blue_2};
  :disabled {
    background-color: #5296f698;
  }
`;
const NoAccount = styled.p`
  color: ${props => props.theme.text_gray_1};
  padding: 1rem;
  font-weight: 200;
`;
const NewChatModel = ({ setShowModel, setCurrentConversation, rooms }) => {
  // console.log(rooms);
  const [accounts, SetAccounts] = useState([]);
  const [account, setAccount] = useState('');
  const [selected, setSelected] = useState(null);
  const { loading, data, error } = useFetch(`/users/search?pattern=${account}`);
  const handleChange = e => {
    const value = e.target.value;
    setAccount(value);
  };
  const chat = () => {
    // rooms.forEach(item => {
    //   const { members } = item;
    //   const exists = members.some(item => item._id === selected?._id);
    //   if (true) {
    //     const receiver = members.find(item => item._id === selected?._id);
    //     setCurrentConversation({
    //       receiverID: receiver?._id,
    //       profilePic: receiver?.profilePic,
    //       username: receiver?.username,
    //       name: receiver?.name,
    //       roomID: item?._id,
    //     });
    //   }
    //   console.log(exists);
    // });
    setCurrentConversation({
      receiverID: selected?._id,
      profilePic: selected?.profilePic,
      username: selected?.username,
      name: selected?.name,
      roomID: null,
      mode: 'pending',
    });
    setShowModel(false);
    setSelected(null);
  };

  useEffect(() => {
    if (data) {
      SetAccounts(data.accounts);
    }
  }, [data]);

  if (error) console.log(error);
  return (
    <Model
      closeUsingParent
      openModel={setShowModel}
      center
      bg=' rgba(0,0,0,.3)'
    >
      <Container onClick={e => e.stopPropagation()}>
        <TitleContainer>
          <Title>New messege</Title>
          <IconButton onClick={() => setShowModel(false)}>
            <Close />
          </IconButton>
        </TitleContainer>
        <SearchContainer>
          <InputDescription>To:</InputDescription>
          <Input
            value={account}
            onChange={handleChange}
            placeholder='Search...'
          />
        </SearchContainer>
        {loading ? (
          <ChatsContainer>
            <AccountsSkeleton />
          </ChatsContainer>
        ) : (
          <ChatsContainer>
            {accounts.length === 0 ? (
              <NoAccount>No account found</NoAccount>
            ) : (
              accounts?.map(item => (
                <Account
                  setSelected={setSelected}
                  {...item}
                  key={item._id}
                />
              ))
            )}
          </ChatsContainer>
        )}
        <ButtonContainer>
          <Button
            disabled={selected ? false : true}
            onClick={chat}
          >
            chat
          </Button>
        </ButtonContainer>
      </Container>
    </Model>
  );
};

export default NewChatModel;
