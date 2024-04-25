import React, { useState } from 'react';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostCaption from './PostCaption';
import PostCollection from '../post/PostCollection';
import { postData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContext';
import Toast from '../../components/models/Toast';
const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000ce;
`;
const Image = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: contain;
    @media screen and (min-width: 768px) {
        max-height: none;
    }
`;
const Video = styled.video`
    max-width: 100%;
    height: 100%;
    max-height: 250px;
    object-fit: cover;
    @media screen and (min-width: 768px) {
        max-height: none;
    }
`;
const CaptionContainer = styled.div`
    flex: 1;
    display: flex;
`;
const PostPreview = ({ goBack, handlePosts, handleModel, posts }) => {
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { token } = useAppContext();
    const [caption, setCaption] = useState('');

    const handleUpload = async () => {
        try {
            setLoading(true);
            const res = await postData(
                '/posts',
                { posts, caption, folder: 'instagram-clone/posts' },
                token
            );
            if (res.success) {
                handlePosts(prev => [res.post, ...prev]);
                setCaption('');
                handleModel(false);
            }
        } catch (error) {
            setShowToast(true);
            setToastMessage(
                error?.response?.data?.message || 'something went wrong!!!'
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <PostHeader
                goBack={goBack}
                handleUpload={handleUpload}
                loading={loading}
                title='Create new post'
            />
            <Container>
                {posts.length === 1 ? (
                    <ImageContainer>
                        {posts[0].postType === 'video' ? (
                            <Video
                                controls
                                src={posts[0].url}
                            />
                        ) : (
                            <Image src={posts[0].url} />
                        )}
                    </ImageContainer>
                ) : (
                    <PostCollection
                        related={posts}
                        height
                        showControls
                    />
                )}

                <CaptionContainer>
                    <PostCaption
                        caption={caption}
                        handleCaption={setCaption}
                    />
                </CaptionContainer>
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

export default PostPreview;
