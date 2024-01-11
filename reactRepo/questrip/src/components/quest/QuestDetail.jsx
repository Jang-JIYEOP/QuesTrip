import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const QuestDetail = () => {

    const StyledQuestListDiv = styled.div`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 3fr 1fr 2fr 2fr;
        grid-template-rows: 4fr 0.7fr 2fr;
        place-items: center center;

        & > div {
            width: 100%;
            height: 100%;
            border: 1px solid lightgray;
        }
        #map{
            grid-column: span 2;            
        }
        #img{
            grid-column: span 2;  
        }
        #content{
            grid-column: span 3;  

        }
    `;
  const location = useLocation();
  const vo = location.state.vo;
    console.log("퀘스트 디테일",vo);
    
    return (
        <StyledQuestListDiv>
            <div id='map'>지도</div>
            <div id='img'>이미지</div>
            <div id='title'>위치이름 : {vo.title}</div>
            <div id='headCnt'>인원수 : {vo.headCnt}</div>
            <div id='queCateNo'>분류 : {vo.queCateNo}</div>
            <div id='rating'>평균 별점 : {vo.rating}</div>
            <div id='content'>내용 : {vo.content}</div>
            <div id='point'>포인트 : {vo.point}</div>
        </StyledQuestListDiv>
    );
};

export default QuestDetail;