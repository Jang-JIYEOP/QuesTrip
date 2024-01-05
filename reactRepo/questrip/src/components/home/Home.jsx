import React from 'react';
import styled from 'styled-components';


const StyledHomeDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 1fr;
    place-items: center center;
    & > div{
        width: 100%;
        height: 100%;
        border: 1px solid black;
    }
`;

const Home = () => {
    return (
        <StyledHomeDiv>
            <div>자유게시판</div>
            <div>퀘스트</div>
        </StyledHomeDiv>
    );
};

export default Home;