import React from 'react';
import styled from 'styled-components';
import Main from './Main';
import Logo from './Logo';
import AdminNavi from './AdminNavi';

const StlyedLayoutDiv = styled.div`
    width: 100vw;
    height: 90vh;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 5fr;
    grid-template-columns: 1fr 5fr;
    place-items: center center;
    & >div:nth-child(1){
        
      grid-column: span 2;
    }
    

`;

const AdminLayout = () => {
    return (
        <StlyedLayoutDiv>
         <Logo/>
         <AdminNavi/>
         <Main/>
    </StlyedLayoutDiv>
    );
};

export default AdminLayout;