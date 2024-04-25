import React from 'react';
import styled from 'styled-components';
import Sidenav from '../../components/nav/Sidenav';
import Post from '../../components/single/Post';
import { useLocation } from 'react-router-dom';

const Container = styled.section`
    display: flex;
    height: 100%;
`;
const Left = styled.div`
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
const Right = styled.div`
    flex: 4.3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    /* background-color: #FAFAFA; */
`;
const SinglePost = () => {
    const location = useLocation();
    const postID = location?.state?._id;
    return (
        <Container>
            <Left>
                <Sidenav />
            </Left>
            <Right>
                <Post postID={postID} />
            </Right>
        </Container>
    );
};

export default SinglePost;
