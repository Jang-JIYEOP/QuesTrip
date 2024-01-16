import React from 'react';
import styled from 'styled-components';
import Main from './Main';
import Logo from './Logo';

const StlyedLayoutDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 5fr;
    grid-template-columns: 3fr;
    place-items: center center;
    
`;

const AdminLayout = () => {
    return (
        <StlyedLayoutDiv>
         <Logo/>
         <Main/>
    </StlyedLayoutDiv>
    );
};

export default AdminLayout;