import React from 'react';
import styled from 'styled-components';
import PostImage from '../post/PostImage';
import PostCollection from '../post/PostCollection';
import NoPosts from './NoPosts';
import ProfileVideo from './ProfileVideo';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-auto-rows: 150px;
    gap: 0.2rem;
    @media screen and (min-width: 650px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-auto-rows: 200px;
    }
    @media screen and (min-width: 900px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 300px;
    }
`;
const PostContainer = styled.div`
    box-shadow: 3px 3px 5px #e4e4e44a;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Posts = ({ posts = [], slug }) => {
    const navigate = useNavigate();
    const handleClick = postID => {
        navigate(`/p/${postID}`, { state: { _id: postID } });
    };
    if (posts.length === 0) {
        let title = '';
        let description = '';
        switch (slug) {
            case 'posts':
                title = 'No Photos';
                description = `When you post. They will appear here`;
                break;
            case 'reels':
                title = 'Photos of you';
                description = `When you post videos. They will appear here`;
                break;
            case 'saved':
                title = 'Photos of you';
                description = `When you save photos. They will appear here`;

                break;
            case 'tagged':
                title = 'Photos of you';
                description = `When people tag you in photos. They will appear here`;

                break;
            default:
                title = '';
                description = '';
        }
        return (
            <>
                <NoPosts
                    title={title}
                    description={description}
                />
            </>
        );
    }

    return (
        <Container>
            {posts.map(post => {
                const {
                    postType,
                    url: { postUrl },
                    _id,
                    related,
                } = post;
                return (
                    <PostContainer key={_id}>
                        {postType === 'video' ? (
                            <ProfileVideo
                                url={postUrl}
                                cover
                            />
                        ) : postType === 'collection' ? (
                            <PostCollection related={related} />
                        ) : (
                            <PostImage
                                url={postUrl}
                                cover
                            />
                        )}
                    </PostContainer>
                );
            })}
        </Container>
    );
};

export default Posts;
