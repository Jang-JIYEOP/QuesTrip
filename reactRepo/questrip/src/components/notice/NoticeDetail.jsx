import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuestMemory } from '../community/context/QuestContext';
import { useLoginMemory } from '../community/context/LoginContext';

const StyledQuestListDiv = styled.div`
         width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr 9fr 1fr;
    place-items: center center;
    gap: 20px;
    padding: 20px;

    & > div {
        width: 100%;
        height: 100%;
        border: 1px solid lightgray;
        padding: 10px;
        box-sizing: border-box;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    #title, #enrollDate {
        font-size: 20px;
        font-weight: bold;
    }

    #content {
        grid-column: span 2; 
        font-size: 16px;
    }

    button {
        grid-column: span 2; 
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #3498db;
        color: white;
        cursor: pointer;
        font-size: 16px;
        &:hover {
            background-color: #2980b9;
        }
    }
    `;

const NoticeDetail = () => {
    
    
const navigate = useNavigate(); 
const location = useLocation();
const vo = location.state.vo;
const {setSearchInfoVo} = useQuestMemory();
const loginNumber = sessionStorage.getItem('loginInfo');
const {setLoginInfo} = useLoginMemory();
useEffect(() => {
     
    if(loginNumber !== null){
        setLoginInfo({no : loginNumber});
    }
setSearchInfoVo({
  locCateNo : 1,
  pageNo : 0,
  limit : 0,
});
},[]);

const handleBackClick = (vo) => {
    navigate('/notice/list');
};
return (
        <StyledQuestListDiv>
            <div id='title'>제목 : {vo.title}</div>
            <div id='enrollDate'>작성일자 : {vo.enrollDate}</div>
            <div id='content'> {vo.content}</div>
            <button onClick={() => handleBackClick(vo)}>목록으로</button>
        </StyledQuestListDiv>
    );
};

export default NoticeDetail;