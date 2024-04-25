import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../api/useFetch';
import { useAppContext } from '../../context/AppContext';
import FollowingsSkeleton from '../../components/skeletons/FollowingsSkeleton';
const Wrapper = styled.div`
  padding: 1rem 0;
  overflow: auto;
  width: 100%;
  max-width: 500px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  align-items: center;
  .link {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: center;
  }
  .profile {
    width: 60px;
    height: 60px;
    border-top: 2px solid #fe016a;
    border-right: 2px solid #d600be;
    border-bottom: 2px solid #ffc500;
    border-left: 2px solid #ff3938;
    cursor: pointer;
  }
`;
const FollowingLabel = styled.p`
  color: ${props => props.theme.text_primary};
  font-size: 0.8rem;
  cursor: pointer;
  letter-spacing: 0.5px;
`;
const Followings = () => {
  const { user } = useAppContext();
  const [followings, updateFollowings] = useState([]);
  const { loading, error, data } = useFetch('/users?followings=true');
  const navigate = useNavigate();
  const handleClick = (id, username) => {
    navigate(`/profile/${username}`, { state: { _id: id } });
  };

  useEffect(() => {
    data && updateFollowings(data.users);
  }, [data]);
  // useEffect(() => {
  //     updateFollowings(data.users);
  // }, [user]);
  if (loading) {
    return <FollowingsSkeleton counter={10} />;
  }
  if (error) {
    return <h1>could not load followings</h1>;
  }
  return (
    <Wrapper>
      <Container>
        {followings.map(following => {
          const { profilePic, username, _id } = following;
          return (
            <div
              onClick={e => handleClick(_id, username)}
              className='link'
            >
              <Avatar
                className='profile'
                alt={username}
                src={profilePic?.url}
              />
              <FollowingLabel> {username} </FollowingLabel>
            </div>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Followings;
