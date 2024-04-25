import { GridOn } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlaySquare } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { useAppContext } from '../../context/AppContext';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${props => props.theme.border};
`;
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    max-width: 400px;
    @media screen and (min-width: 768px) {
        gap: 1rem;
    }
`;
const Controller = styled.div`
    display: flex;
    align-items: center;

    .control {
        font-size: 1.7rem;
        color: ${props => props.theme.primary_2};
    }
    .control.bookmark {
        font-size: 1.3rem;
    }
    .control.active {
        border-top: 1px solid #000000;
        color: #000000;
    }
`;
const ControllerLabel = styled.p`
    display: none;
    @media screen and (min-width: 768px) {
        display: block;
        text-transform: capitalize;
        color: ${props => props.theme.primary_2};
    }
`;
const PostControllers = ({ setSlug, userID }) => {
    const {
        user: { _id: loggedInUserID },
    } = useAppContext();
    const [index, setIndex] = useState(0);
    const mine = userID === loggedInUserID;
    const handleSlug = index => {
        switch (index) {
            case 0:
                return 'posts';
            case 1:
                return 'reels';
            case 2:
                return 'saved';
            case 3:
                return 'tagged';
            default:
                return 'posts';
        }
    };
    useEffect(() => {
        const icons = document.querySelectorAll('.control');
        icons.forEach((icon, iconIndex) => {
            if (icon.classList.contains('active')) {
                icon.classList.remove('active');
            }
            if (index === iconIndex) {
                icon.classList.add('active');
                setSlug(handleSlug(index));
            }
            icon.addEventListener('click', e => setIndex(iconIndex));
        });
    }, [index]);
    return (
        <Wrapper>
            <Container>
                <Controller>
                    <IconButton className='wrapper'>
                        <GridOn className='control' />
                    </IconButton>
                    <ControllerLabel>posts</ControllerLabel>
                </Controller>
                <Controller>
                    <IconButton className='wrapper'>
                        <AiOutlinePlaySquare className='control' />
                    </IconButton>
                    <ControllerLabel>reels</ControllerLabel>
                </Controller>
                {mine && (
                    <Controller>
                        <IconButton className='wrapper'>
                            <BsBookmark className='control bookmark' />
                        </IconButton>
                        <ControllerLabel>saved</ControllerLabel>
                    </Controller>
                )}
                <Controller>
                    <IconButton className='wrapper'>
                        <AccountBoxOutlinedIcon className='control' />
                    </IconButton>
                    <ControllerLabel>tagged</ControllerLabel>
                </Controller>
            </Container>
        </Wrapper>
    );
};

export default PostControllers;
