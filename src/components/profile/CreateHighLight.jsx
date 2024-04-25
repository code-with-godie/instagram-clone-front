import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { postData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContext';
const Container = styled.div`
    width: 100%;
    max-width: 400px;
    background: ${props => props.theme.bg_primary};
    border: 1px solid ${props => props.theme.main_white};
    min-height: 100px;
    border-radius: 0.5rem;
    color: ${props => props.theme.text_semi_black};
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;
const TitleContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.border};
`;
const Title = styled.p`
    font-size: 1.2rem;
    text-transform: capitalize;
    flex: 1;
    text-align: center;
`;
const InputContainer = styled.div`
    display: flex;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${props => props.theme.border};
`;
const Input = styled.input`
    flex: 1;
    padding: 0.7rem;
    border-radius: 0.3rem;
    outline: none;
    border: 1px solid ${props => props.theme.border};
    background: transparent;
    color: ${props => props.theme.text_semi_black};
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const Next = styled.button`
    color: ${props => props.theme.blue};
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1.2rem;
    text-transform: capitalize;
    outline: none;
    background: transparent;
    border: none;
`;
const CreateHighLight = ({ setHighLights, setSelect }) => {
    const {
        token,
        user: { _id: userID },
        openToast,
    } = useAppContext();
    const inputRef = useRef(null);
    const [desc, setDesc] = useState('');
    const [cover, setCover] = useState('');
    const [loading, setLoading] = useState(false);
    const pickRef = useRef(null);
    const choosePicture = () => {
        pickRef.current?.click();
    };

    const handleFile = e => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setCover(fileReader.result);
        };
    };
    const upload = async () => {
        try {
            setLoading(true);
            const res = await postData(
                `/highlights/${userID}`,
                { cover, photo: cover, description: desc },
                token
            );
            if (res.success) {
                setHighLights(prev => [...prev, res.highLight]);
                setSelect(false);
            }
            console.log(res);
        } catch (error) {
            const messege =
                error?.response?.data?.message || 'Something went wrong';
            openToast(messege);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <Container>
            <TitleContainer>
                <Title>new highlight</Title>
                <IconButton onClick={e => setSelect(false)}>
                    <Close className='icon' />
                </IconButton>
            </TitleContainer>
            <InputContainer>
                <Input
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    ref={inputRef}
                />
            </InputContainer>
            <ButtonContainer>
                {cover ? (
                    <Next onClick={upload}>
                        {' '}
                        {loading ? 'loading' : 'upload'}{' '}
                    </Next>
                ) : (
                    <Next onClick={choosePicture}>next</Next>
                )}
                <input
                    type='file'
                    hidden
                    onChange={handleFile}
                    ref={pickRef}
                />
            </ButtonContainer>
        </Container>
    );
};

export default CreateHighLight;
