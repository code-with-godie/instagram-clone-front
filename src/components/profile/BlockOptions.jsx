import React, { useState } from 'react';
import styled from 'styled-components';
import AboutOption from '../utility/AboutOption';
import { updateData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 400px;
    min-height: 100px;
    background-color: ${props => props.theme.bg_primary};
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.main_white};
`;
const Option = styled.p`
    padding: 0.7rem;
    text-align: center;
    font-family: 'Lora', sans-serif;
    text-transform: capitalize;
    cursor: pointer;
    color: ${props => props.theme.text_semi_black};
    &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.border};
    }
    &.main {
        color: tomato;
        font-weight: bold !important;
    }
    &.blue {
        color: #0095f6;
        font-weight: bold !important;
    }
`;
const BlockOptions = ({ handleModel, username, url, userID, blocked }) => {
    const [about, setAbout] = useState(false);
    const {
        token,
        user: { blockUser },
        user,
        updateUser,
    } = useAppContext();
    const blockAccount = async () => {
        try {
            const res = await updateData(`/users/block/${userID}`, {}, token);
            if (res.success) {
                const { user } = res;
                updateUser(user);
                setTimeout(() => {
                    handleModel(false);
                }, 300);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            {about ? (
                <AboutOption
                    handleAbout={setAbout}
                    username={username}
                    url={url}
                />
            ) : (
                <>
                    <Option
                        onClick={blockAccount}
                        className='main'
                    >
                        {' '}
                        {blocked ? 'unblock' : 'block'}{' '}
                    </Option>
                    <Option className='main'>restrict</Option>
                    <Option className='main'>report</Option>
                    <Option onClick={e => setAbout(true)}>
                        about this account
                    </Option>
                    <Option onClick={e => handleModel(false)}>cancel</Option>
                </>
            )}
        </Container>
    );
};

export default BlockOptions;
