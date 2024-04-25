import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Sidenav from '../../components/nav/Sidenav';
import ProfileDescription from '../../components/profile/ProfileDescription';
import ProfilePosts from '../../components/profile/ProfilePosts';
import { useLocation } from 'react-router-dom';
import Suggested from '../../components/profile/Suggested';
import CompleteAccount from '../../components/profile/CompleteAccount';
import Highlights from '../../components/profile/Highlights';

const Container = styled.section`
    height: 100%;
    overflow: auto;
    display: flex;
`;
const Left = styled.article`
    border-right: 1px solid #dbdbdb;
    padding: 0.5rem;
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
    }
    @media screen and (min-width: 1300px) {
        flex: 1;
    }
`;
const Right = styled.article`
    padding: 0.5rem;
    flex: 4;
    overflow: auto;
`;
const Profile = () => {
    const {
        state: { _id: userID },
    } = useLocation();
    const [showSuggested, setShowSuggested] = useState(false);
    const [user, setUser] = useState(null);
    const [completeAccountSetup, setCompleteAccountSetup] = useState(false);

    const getUser = user => {
        setUser(user);
    };
    useEffect(() => {
        const prev = document.title;
        if (user) {
            document.title = `Instagram.@ ${user?.username} `;
        }
        return () => {
            document.title = prev;
        };
    }, [user]);
    return (
        <Container>
            <Left>
                <Sidenav />
            </Left>
            <Right>
                <ProfileHeader />
                <ProfileDescription
                    userID={userID}
                    getUser={getUser}
                    showSuggested={setShowSuggested}
                    setCompleteAccountSetup={setCompleteAccountSetup}
                />
                <Highlights userID={userID} />
                {showSuggested && <Suggested />}
                {completeAccountSetup && <CompleteAccount />}
                <ProfilePosts userID={userID} />
            </Right>
        </Container>
    );
};

export default Profile;
