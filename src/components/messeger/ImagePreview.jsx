import React from 'react';
import styled from 'styled-components';
const Image = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 100%;
    align-self: center;
    border-radius: 0.5rem;
`;
const ImagePreview = ({ url }) => {
    return <Image src={url} />;
};

export default ImagePreview;
