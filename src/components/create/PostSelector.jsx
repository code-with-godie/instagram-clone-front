import React, { useCallback } from 'react';
import styled from 'styled-components';
import img from '../../assets/create.PNG';
import { useDropzone } from 'react-dropzone';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: 0.5rem;
    background-color: ${props => props.drag && '#f9f9f9'};
`;

const Title = styled.h3`
    text-align: center;
    font-family: 'Popins', sans-serif;
    font-weight: 400;
    border-bottom: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.text_primary};
    padding: 0.5rem;
`;
const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`;
const Image = styled.img``;
const Description = styled.p`
    font-weight: 400;
    font-size: 1.3rem;
    color: ${props => props.theme.text_semi_black};
`;
const SelectButton = styled.label`
    background: #1877f2;
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    text-transform: capitalize;
    cursor: pointer;
`;
const PostSelector = ({ handleFiles }) => {
    const onDrop = acceptedFiles => {
        handleFiles(acceptedFiles);
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    return (
        <Container
            {...getRootProps({
                drag: isDragActive,
            })}
        >
            <Title>Create new post</Title>
            <ContentContainer>
                <Image src={img} />
                {isDragActive ? (
                    <Description>Drop the file here</Description>
                ) : (
                    <>
                        <Description>Drag photos and videos here</Description>
                        <SelectButton>select from you computer </SelectButton>
                    </>
                )}
                <input
                    type='file'
                    hidden
                    name='file'
                    id='file'
                    {...getInputProps({ multiple: true })}
                />
            </ContentContainer>
        </Container>
    );
};

export default PostSelector;
