import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import styled from 'styled-components';
import HighLight from './HighLight';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';
import Model from '../models/Model';
import CreateHighLight from './CreateHighLight';
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    @media screen and (min-width: 768px) {
        gap: 1rem;
    }
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const Title = styled.p`
    color: ${props => props.theme.text_semi_black};
    padding: 0.5rem;
`;
const AddWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
`;
const AddContainer = styled.div`
    border-radius: 50%;
    border: 1px solid ${props => props.theme.border};
    .icon {
        font-size: 2.5rem;
        color: ${props => props.theme.text_gray_1};
        @media screen and (min-width: 768px) {
            font-size: 3rem;
        }
        @media screen and (min-width: 900px) {
            font-size: 3.5rem;
        }
        @media screen and (min-width: 1200px) {
            font-size: 4rem;
        }
    }
`;
const AddDescription = styled.p`
    font-size: 1rem;
    color: ${props => props.theme.text_primary};
`;
const AddHighLight = ({ openModel }) => {
    return (
        <AddWrapper>
            <AddContainer>
                <IconButton onClick={e => openModel(true)}>
                    <BiPlus className='icon' />
                </IconButton>
            </AddContainer>
            <AddDescription>New</AddDescription>
        </AddWrapper>
    );
};
const Highlights = ({ userID }) => {
    const {
        user: { _id: loggedInUserID },
    } = useAppContext();
    const mine = loggedInUserID === userID;
    const [highlights, setHighlights] = useState([]);
    const [showAdd, setShowAdd] = useState(highlights.length < 10);
    const [select, setSelect] = useState(false);
    const { loading, data, error } = useFetch(`/highlights/${userID}`);

    useEffect(() => {
        setShowAdd(highlights.length < 10);
    }, [highlights]);
    useEffect(() => {
        if (data) {
            setHighlights(data.highLights);
            setShowAdd(highlights.length < 10);
        }
    }, [data]);
    return (
        <Wrapper>
            <Title>Highlights</Title>
            <Container>
                {loading ? (
                    <LoadingAnimation />
                ) : (
                    highlights.map(item => (
                        <HighLight
                            key={item._id}
                            {...item}
                        />
                    ))
                )}
                {showAdd && mine && <AddHighLight openModel={setSelect} />}
            </Container>
            {select && (
                <Model
                    bg={`rgba(0, 0, 0, 0.178)`}
                    center
                >
                    <CreateHighLight
                        setSelect={setSelect}
                        setHighLights={setHighlights}
                    />
                </Model>
            )}
        </Wrapper>
    );
};

export default Highlights;
