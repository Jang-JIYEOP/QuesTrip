import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNaviDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    place-items: center center;
    color: white;
    font-size: 1rem;
    border-bottom: 1px solid lightgray;
    & > div > a{
            text-decoration: none;
    }
`;

const Navi = () => {
    return (
        <StyledNaviDiv>
            <div><Link to ="/community/list">자유게시판</Link></div>
            <div><Link to ="/diary/list">일기</Link></div>
            <div><Link to ="/quest/list">퀘스트</Link></div>
            <div><Link to ="/notice/list">공지사항</Link></div>
            <div><Link to ="/icon/shop">아이콘샵</Link></div>
        </StyledNaviDiv>
        
    );
};

export default Navi;