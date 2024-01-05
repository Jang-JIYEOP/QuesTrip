import React from 'react';
import Header from './Header';
import Navi from './Navi';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';



const StlyedLayoutDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: grid;
    grid-template-rows: 0.5fr 1fr 6fr 1.5fr;
    grid-template-columns: 1fr;
    place-items: center center;
    & > div{
        width: 60%;
    }
`;


const Layout = () => {
    return (
            <StlyedLayoutDiv>
                <Header/>
                <Navi/>
                <Main/>
                <Footer/>
            </StlyedLayoutDiv>
    );
};

export default Layout;