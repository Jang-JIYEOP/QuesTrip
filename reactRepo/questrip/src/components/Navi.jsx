import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNaviDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
    background-color: #0088f896;
    color: white;
    border-radius: 8px;
    font-size: 1rem;
    border-bottom: 1px solid lightgray;
    a {
        color: white;
        text-decoration: none;
        padding: 10px;
        transition: color 0.3s ease;
        &:hover {
            color: #f8f9fa;
        }
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