import React, { useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import Toast from '../models/Toast';
import { postData, updateData } from '../../api/apiCalls';
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
	max-width: 400px;
	min-height: 100px;
	background-color: white;
	border-radius: 0.5rem;
`;
const AvatorContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	align-items: center;
	.profile {
		width: 60px;
		height: 60px;
	}
`;
const Title = styled.p`
	font-family: 'Lora', sans-serif;
	font-size: 1.3rem;
`;
const Description = styled(Title)`
	font-size: 0.9rem;
	color: #8f8f8f;
	text-transform: capitalize;
`;
const Container = styled.div``;
const Option = styled.p`
	padding: 0.7rem;
	text-align: center;
	font-family: 'Lora', sans-serif;
	text-transform: capitalize;
	cursor: pointer;
	color: #101010e5;
	&:not(:last-child) {
		border-bottom: 1px solid #dcdcdc;
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

const UserOptions = ({ handleModel, setProfileLoading, setCurrentUser }) => {
	const {
		user: { profilePic, name, _id: userID },
		token,
		setUser,
	} = useAppContext();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const selector = useRef();
	//component controllers
	const removeProfilePic = () => upload('');
	const changeProfile = e => {
		const profile = e.target.files[0];
		const fileType = profile.type.split('/')[0];
		if (fileType !== 'image') {
			setShowToast(true);
			setToastMessage('only images are allowed');
			return;
		}
		const fileReader = new FileReader();
		fileReader.readAsDataURL(profile);
		fileReader.onload = () => upload(fileReader.result);
	};

	const handleChangeProfile = () => selector.current?.click();

	const upload = async profilePic => {
		try {
			setProfileLoading(true);
			handleModel(false);
			const res = await updateData(
				`/users/${userID}`,
				{ profilePic },
				token
			);
			if (res.success) {
				setShowToast(true);
				setUser(res.user);
				setCurrentUser(res.user);
				localStorage.setItem(
					'insta-clone-user',
					JSON.stringify(res.user)
				);
				setToastMessage('profile photo updated');
			}
		} catch (error) {
			console.log(error);
			setShowToast(true);
			setToastMessage(
				error?.response?.data?.message || 'something went wrong!!!'
			);
		} finally {
			setProfileLoading(false);
		}
	};
	return (
		<Wrapper>
			<AvatorContainer>
				<IconButton>
					{' '}
					<Avatar
						alt={name}
						src={profilePic}
						className='profile'
					/>{' '}
				</IconButton>
				<Title>Synced profile photo</Title>
				<Description>intagram,facebook</Description>
			</AvatorContainer>
			<Container>
				<Option
					className='blue'
					onClick={handleChangeProfile}
				>
					upload photo
				</Option>
				<input
					ref={selector}
					type='file'
					hidden
					onChange={e => changeProfile(e)}
				/>
				<Option>manage sync settings</Option>
				<Option
					className='main'
					onClick={removeProfilePic}
				>
					remove current photo
				</Option>
				<Option onClick={e => handleModel(false)}>cancel</Option>
			</Container>
			{showToast && (
				<Toast
					messege={toastMessage}
					handleToast={setShowToast}
				/>
			)}
		</Wrapper>
	);
};

export default UserOptions;
