import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormInput from '../../components/utility/FormInput';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { useAppContext } from '../../context/AppContext';
import { postData } from '../../api/apiCalls';
const Container = styled.form`
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Button = styled.button`
  padding: 0.7rem;
  border-radius: 0.5rem;
  background-color: #4cb5f9;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:disabled {
    background-color: #d0d0d0;
  }
`;
const Register = () => {
  const { setToastMessage, setShowToast } = useAppContext();
  const [user, setUser] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postData('/users/auth/register', user);
      if (res) {
        navigate('/login');
        setUser({
          email: '',
          name: '',
          username: '',
          password: '',
        });
      }
    } catch (error) {
      console.log(error);
      setToastMessage(
        error?.response?.data?.message || 'something went wrong!!!'
      );
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (
      !user.email ||
      !user.name ||
      !user.username ||
      user.password.length < 8
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);
  return (
    <Container onSubmit={handleSubmit}>
      <FormInput
        placeholder='Mobile number or email address'
        name='email'
        type='email'
        value={user.email}
        required={true}
        handlChange={handleChange}
      />
      <FormInput
        placeholder='Full name'
        name='name'
        type='text'
        value={user.name}
        required={true}
        handlChange={handleChange}
      />
      <FormInput
        placeholder='username'
        name='username'
        type='text'
        value={user.username}
        required={true}
        handlChange={handleChange}
      />
      <FormInput
        placeholder='password'
        name='password'
        type='password'
        value={user.password}
        required={true}
        handlChange={handleChange}
      />
      <Button disabled={disabled}>
        {loading ? <LoadingAnimation /> : 'sign up'}
      </Button>
    </Container>
  );
};

export default Register;
