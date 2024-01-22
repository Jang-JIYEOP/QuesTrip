import React from 'react';
import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
const StyledWrqpDiv = styled.div`
    width: 100%;
    height: 100%;
    
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    place-items: center center;

    div {
        width: 100%;
        height: 100%;
    }
    #img{
        grid-row: span 3;
        img {
                width: 100%;
                height: 100%;
                object-fit: cover; // or contain
            }
    }
    #title{
        grid-column: span 2;
    }
    
`;
const QuestListItem = ({vo}) => {

    const navigate = useNavigate();
    const handleClickQuestList = () => {
        navigate('/quest/detail', { state:  {vo}  });
    };

    return (
        <StyledWrqpDiv onClick={handleClickQuestList}>
            <div id="img">
                <img src={vo.imgPath} alt="퀘스트이미지" />
            </div>
            <div id="title">위치 : {vo.title}</div>
            <div id="queCate">가족</div>
            <div id="headCnt"> {vo.headCnt} 명</div>
            <div id="rate">❤   {vo.rating}</div>
            <div id="point">🧭  {vo.point}</div>
        </StyledWrqpDiv>
    );
};

export default QuestListItem;