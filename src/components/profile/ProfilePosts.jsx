import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostControllers from './PostControllers';
import Posts from './Posts';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';
const Container = styled.div`
    margin-top: 0.3rem;
`;
const ProfilePosts = ({ userID }) => {
    const [slug, setSlug] = useState('posts');
    const { loading, data, error } = useFetch(
        `/posts/specific/${userID}/${slug}`
    );
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        data && setPosts(data.posts);
    }, [data]);

    return (
        <Container>
            <PostControllers
                userID={userID}
                setSlug={setSlug}
            />
            {loading ? (
                <LoadingAnimation />
            ) : (
                <Posts
                    slug={slug}
                    posts={posts}
                />
            )}
        </Container>
    );
};

export default ProfilePosts;
