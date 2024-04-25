import React from 'react';
import styled from 'styled-components';
import Sidenav from '../../components/nav/Sidenav';
import BottomNav from '../nav/BottomNav';
import AccountCenter from './AccountCenter';
import AccountSettings from './AccountSettings';
import MyProfileEdit from './MyProfileEdit';
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.bg_primary};
    display: flex;
`;
const Container = styled.div`
    flex: 4.5;
    display: flex;
    gap: 0.5rem;
`;
const SidenavContainer = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
        padding: 0.5rem;
        border-right: 1px solid #dbdbdb;
    }
    @media screen and (min-width: 1300px) {
        flex: 1;
    }
`;

const Left = styled.div`
    display: none;
    @media screen and (min-width: 900px) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        flex: 1;
        border-right: 1px solid #dbdbdb;
    }
`;
const Right = styled.div`
    flex: 3;
`;
const EditProfile = ({ closeModel }) => {
    return (
        <Wrapper>
            <SidenavContainer>
                <Sidenav />
            </SidenavContainer>
            <Container>
                <Left>
                    <AccountCenter />
                    <AccountSettings />
                </Left>
                <Right>
                    <MyProfileEdit closeModel={closeModel} />
                </Right>
            </Container>
            ;
        </Wrapper>
    );
};

export default EditProfile;
