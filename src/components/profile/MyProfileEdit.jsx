import { Avatar, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { updateData } from '../../api/apiCalls';
import LoadingAnimation from '../loading/LoadingAnimation';
const Wrapper = styled.div``;
const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 0.5rem;
    padding-left: 1rem;
`;
const Title = styled.h2`
    color: ${props => props.theme.text_semi_black};
    text-transform: capitalize;
    padding: 1rem;
`;
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
`;
const InputTitleContainer = styled.div`
    flex: 1;
    max-width: 130px;
    display: flex;
    justify-content: flex-end;
`;
const InputConatiner = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    max-width: 400px;
`;
const Input = styled.input`
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.2rem;
    border: 1px solid ${props => props.theme.border};
    background: transparent;
    font-size: 1rem;
    outline: none;
    :disabled {
        cursor: not-allowed;
    }
`;
const Bio = styled.textarea`
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.2rem;
    border: 1px solid ${props => props.theme.border};
    background: transparent;
    font-size: 1rem;
    outline: none;
    height: 200px;
`;
const Description = styled.p`
    font-size: 1rem;
    color: ${props =>
        props.blue ? props.theme.blue : props.theme.text_gray_1};
    font-weight: 100;
    cursor: ${props => props.pointer && 'pointer'};
`;
const DescriptionTiltle = styled(Description)`
    font-size: 1.2rem;
    font-weight: 400;
    color: ${props => props.theme.text_semi_black};
`;
const SmallDescription = styled(Description)`
    font-size: 0.8rem;
`;
const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;
const CheckBoxDescription = styled(Description)`
    color: ${props => props.theme.text_semi_black};
    font-weight: 600;
    font-size: 0.9rem;
`;
const Button = styled.button`
    outline: none;
    background: ${props => (props.blue ? props.theme.blue : 'transparent')};
    color: ${props =>
        props.blue ? props.theme.bg_primary : props.theme.text_semi_black};
    border: 1px solid
        ${props => (props.blue ? 'transparent' : props.theme.border)};
    padding: 0.5rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
`;

const MyProfileEdit = ({ closeModel }) => {
    const profileRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const {
        user: {
            profilePic: { url },
            username,
            gender,
            website,
            suggestAccount,
            bio,
            _id: userID,
        },
        openToast,
        token,
        updateUser,
    } = useAppContext();
    const [account, setAccount] = useState({
        profilePic: url,
        suggestAccount,
        gender,
        bio,
    });
    const handleChange = e => {
        const name = e.target.name;
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setAccount(prev => ({ ...prev, [name]: value }));
    };
    const changeProfile = () => {
        profileRef.current?.click();
    };
    const handleProfile = e => {
        const file = e.target.files[0];
        if (file?.type.split('/')[0] !== 'image') {
            openToast('Only images are allowed');
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setAccount(prev => ({ ...prev, profilePic: fileReader.result }));
        };
    };
    const cancel = () => {
        setAccount({
            profilePic: url,
            suggestAccount,
            gender,
            bio,
        });
        closeModel(false);
    };
    const save = async () => {
        try {
            setLoading(true);
            const res = await updateData(`/users/${userID}`, account, token);
            if (res.success) {
                updateUser(res.user);
                cancel();
            }
        } catch (error) {
            const messege =
                error?.response?.data?.message ||
                'Something went wrong. Try again later';
            openToast(messege);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <Title>Edit Profile</Title>
            <Container onSubmit={e => e.preventDefault()}>
                <InputWrapper>
                    <InputTitleContainer>
                        <IconButton>
                            <Avatar
                                alt={username}
                                src={account.profilePic}
                            />
                        </IconButton>
                    </InputTitleContainer>
                    <InputConatiner>
                        <Description> {username} </Description>
                        <Description
                            blue
                            pointer
                            onClick={changeProfile}
                        >
                            {' '}
                            change profile photo
                        </Description>
                        <input
                            ref={profileRef}
                            type='file'
                            hidden
                            onChange={e => handleProfile(e)}
                        />
                    </InputConatiner>
                </InputWrapper>
                <InputWrapper>
                    <InputTitleContainer>
                        <DescriptionTiltle>Website</DescriptionTiltle>
                    </InputTitleContainer>
                    <InputConatiner>
                        <Input
                            placeholder='Website'
                            value={website}
                            disabled
                        />
                        <SmallDescription>
                            Editing your profile is only available on mobile.
                            visit the instagram app and edit your profile to
                            change the website in our bio
                        </SmallDescription>
                    </InputConatiner>
                </InputWrapper>
                <InputWrapper>
                    <InputTitleContainer>
                        <DescriptionTiltle>Bio</DescriptionTiltle>
                    </InputTitleContainer>
                    <InputConatiner>
                        <Bio
                            value={account.bio}
                            onChange={e => handleChange(e)}
                            name='bio'
                            placeholder='Bio'
                        ></Bio>
                        <SmallDescription> 0 / 150</SmallDescription>
                    </InputConatiner>
                </InputWrapper>
                <InputWrapper>
                    <InputTitleContainer>
                        <DescriptionTiltle>Gender</DescriptionTiltle>
                    </InputTitleContainer>
                    <InputConatiner>
                        <Input
                            value={account.gender}
                            onChange={e => handleChange(e)}
                            name='gender'
                            placeholder='Gender'
                        />
                        <SmallDescription>
                            This wont be part of your public profile
                        </SmallDescription>
                    </InputConatiner>
                </InputWrapper>
                <InputWrapper>
                    <InputTitleContainer>
                        <DescriptionTiltle>
                            Show account suggesion on profile
                        </DescriptionTiltle>
                    </InputTitleContainer>
                    <InputConatiner>
                        <CheckBoxContainer>
                            <Input
                                type='checkbox'
                                name='suggestAccount'
                                checked={account.suggestAccount}
                                onChange={e => handleChange(e)}
                            />
                            <CheckBoxDescription>
                                choose whether people can see similar account
                                suggestions on your profile, and whether you
                                account can be suggested on other profiles ?
                            </CheckBoxDescription>
                        </CheckBoxContainer>
                    </InputConatiner>
                </InputWrapper>
                <InputWrapper>
                    <InputTitleContainer></InputTitleContainer>
                    <CheckBoxContainer>
                        <Button
                            blue
                            type='submit'
                            onClick={save}
                        >
                            {loading ? <LoadingAnimation /> : 'save'}
                        </Button>
                        <Button
                            onClick={cancel}
                            type='button'
                        >
                            cancel
                        </Button>
                    </CheckBoxContainer>
                </InputWrapper>
            </Container>
        </Wrapper>
    );
};

export default MyProfileEdit;
