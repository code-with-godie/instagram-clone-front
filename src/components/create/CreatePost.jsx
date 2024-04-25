import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostSelector from './PostSelector';
import PostPreview from './PostPreview';
import PostCrop from './PostCrop';

const Container = styled.div`
    background-color: ${props => props.theme.bg_primary};
    width: 100%;
    max-width: 350px;
    min-height: 400px;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.text_primary};
    transition: all 500ms;
    display: flex;
    &.large {
        max-width: 400px;
    }
    @media screen and (min-width: 768px) {
        &.large {
            max-width: 600px;
        }
    }
    @media screen and (min-width: 900px) {
        &.large {
            max-width: 700px;
        }
    }
`;
const CreatePost = ({ handlePosts, handleModel }) => {
    useEffect(() => {
        const prev = document.title;
        document.title = 'Create new post . Instagram';

        return () => {
            document.title = prev;
        };
    }, []);
    const [file, setFile] = useState([]);
    const [posts, setPosts] = useState([]);
    const [fileType, setFileType] = useState(null);
    const [index, setIndex] = useState(0);
    const [showPagination, setShowPagination] = useState(false);

    const handleFiles = files => {
        files.forEach((file, index) => {
            const postType = file.type.split('/')[0];
            const postSize = file.size;
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onabort = () => console.log('file reading was aborted');
            fileReader.onerror = () => console.log('file reading has failed');
            fileReader.onload = () => {
                setPosts(prev => [
                    ...prev,
                    { url: fileReader.result, postType },
                ]);
            };
            setIndex(2);
        });
    };
    const goBack = () => {
        setPosts([]);
        setFileType(null);
        setIndex(0);
    };
    return (
        <Container className={index === 2 && 'large'}>
            {index === 0 ? (
                <PostSelector handleFiles={handleFiles} />
            ) : index === 1 ? (
                <PostCrop
                    files={posts}
                    handlePagination={setShowPagination}
                    handleFiles={handleFiles}
                    setIndex={setIndex}
                    goBack={goBack}
                />
            ) : (
                <PostPreview
                    handlePosts={handlePosts}
                    handleModel={handleModel}
                    posts={posts}
                    goBack={goBack}
                />
            )}
        </Container>
    );
};

export default CreatePost;
