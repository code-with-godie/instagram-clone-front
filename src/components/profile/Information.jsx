import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFetch } from '../../api/useFetch';
import { useAppContext } from '../../context/AppContext';
import LoadingAnimation from '../../components/loading/LoadingAnimation';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Container = styled.div`
    /* border-top:1px solid #DBDBDB; */
    padding: 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    @media screen and (min-width: 500px) {
        gap: 1rem;
    }
`;
const Controller = styled.div`
    display: flex;
    flex-direction: flex-start;
    gap: 0.3rem;
`;
const ControllerTitle = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    @media screen and (min-width: 500px) {
        font-size: 1rem;
    }
`;
const ControllerLabel = styled(ControllerTitle)``;
const UserBioContainer = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Name = styled.h4`
    text-transform: capitalize;
    color: ${props => props.theme.text_primary};
    font-family: 'Lora', sans-serif;
`;
const BioHeader = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    text-transform: capitalize;
`;
const Bio = styled.p`
    /* color: #000000b9; */
    font-family: 'Lora', sans-serif;
    font-size: 0.9rem;
`;
const Information = ({ user }) => {
    const [followers, setFollowers] = useState(user?.followers?.length);
    const [followings, setFollowings] = useState(user?.followings?.length);
    const [postCount, setPostCount] = useState(null);
    const { token } = useAppContext();
    const { data, loading } = useFetch(`posts/count/${user?._id}`);
    useEffect(() => {
        if (user) {
            setFollowers(user?.followers?.length);
            setFollowings(user?.followings?.length);
        }
    }, [user]);
    useEffect(() => {
        if (data) {
            setPostCount(data?.count);
        }
    }, [data]);
    return (
        <Wrapper>
            <Container>
                <Controller>
                    <ControllerTitle>
                        {' '}
                        {loading ? <LoadingAnimation /> : postCount}{' '}
                    </ControllerTitle>
                    <ControllerLabel>
                        {postCount === 1 ? 'post' : 'posts'}
                    </ControllerLabel>
                </Controller>
                <Controller>
                    <ControllerTitle> {followers} </ControllerTitle>
                    <ControllerLabel>
                        {followers === 1 ? 'follower' : 'followers'}{' '}
                    </ControllerLabel>
                </Controller>
                <Controller>
                    <ControllerTitle>{followings}</ControllerTitle>
                    <ControllerLabel>following</ControllerLabel>
                </Controller>
            </Container>
            <UserBioContainer>
                <Name> {user?.name} </Name>
                <BioHeader>product / services</BioHeader>
                <Bio> {user?.bio || 'not specified'} </Bio>
            </UserBioContainer>
        </Wrapper>
    );
};

export default Information;
