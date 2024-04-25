import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logoOne.png';
import { Facebook, KeyboardArrowDown } from '@mui/icons-material';

const Wrapper = styled.main`
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem;
`;
const Container = styled.div`
    padding: 0.5rem;
    border: 1px solid #dbdbdb;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;
const Header = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
`;
const Logo = styled.img`
    width: 100%;
    max-width: 150px;
    height: auto;
`;
const Description = styled.p`
    font-weight: 600;
    color: #bbb7b7;
    font-size: 0.9rem;
    text-align: center;
    letter-spacing: 1px;
`;
const Button = styled.button`
    padding: 0.3rem 1.5rem;
    border-radius: 0.5rem;
    background-color: ${props => props.bg || '#0095F6'};
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
const Divider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0.5rem;
    width: 100%;
`;
const Line = styled.div`
    width: 100%;
    border: 1px solid #dbdbdb;
`;
const DividerText = styled.span`
    position: absolute;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: white;
    font-size: 0.7rem;
    color: #c0bebe;
`;
const Footer = styled.footer`
    border: 1px solid #dbdbdb;
    padding: 1.5rem;
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const FooterDescription = styled.p`
    color: #000000e4;
    font-size: 0.9rem;
    .link {
        color: #93daff;
        text-decoration: none;
    }
`;
const LinkWrapper = styled.div`
    flex: 1;
    width: 100%;
    max-width: 1024px;
    display: flex;
    align-items: flex-end;
    align-content: flex-end;
    gap: 0.5rem;
`;
const LinksContainer = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    .link {
        text-decoration: none;
        color: #d4d4d4;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        text-transform: capitalize;
        &:hover {
            text-decoration: underline;
        }
    }
`;
const CopyrightContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;
const LanguageContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;
const Language = styled.p``;
const Copyright = styled.p``;
const AuthLayout = () => {
    const location = useLocation();
    const { pathname } = location;
    const login = pathname === '/login' ? true : false;
    return (
        <Wrapper>
            <Container>
                <Header>
                    <LogoContainer>
                        <Logo src={logo} />
                    </LogoContainer>
                    <Description>
                        Sign up to see photos and videos from you friends.
                    </Description>
                    <Button>
                        {' '}
                        <Facebook /> Log in with facebook
                    </Button>
                    <Divider>
                        <Line />
                        <DividerText>OR</DividerText>
                    </Divider>
                </Header>
                <Outlet />
            </Container>
            <Footer>
                <FooterDescription>
                    {`${login ? 'dont have an account?' : 'Have an account?'}`}{' '}
                    <Link
                        to={`${login ? '/register' : '/login'}`}
                        className='link'
                    >{`${login ? 'sign up' : 'sign in'}`}</Link>
                </FooterDescription>
            </Footer>
            <LinkWrapper>
                <LinksContainer>
                    <Link className='link'>Meta</Link>
                    <Link className='link'>About</Link>
                    <Link className='link'>blog</Link>
                    <Link className='link'>jobs</Link>
                    <Link className='link'>help</Link>
                    <Link className='link'>API</Link>
                    <Link className='link'>privacy</Link>
                    <Link className='link'>terms</Link>
                    <Link className='link'>top account</Link>
                    <Link className='link'>locations</Link>
                    <Link className='link'>instagram lite</Link>
                    <Link className='link'>
                        contact uploading and non users
                    </Link>
                    <Link className='link'>godie verified</Link>
                </LinksContainer>
                {/* <CopyrightContainer>
      <LanguageContainer>
        <Language>english <KeyboardArrowDown/> </Language>
      </LanguageContainer>
    </CopyrightContainer> */}
            </LinkWrapper>
        </Wrapper>
    );
};

export default AuthLayout;
