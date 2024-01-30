import React from 'react';
import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
const StyledWrqpDiv = styled.div`
    width: 100%;
    height: 90%;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    place-items: center center;
    cursor: pointer;

    div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }

    #img {
        grid-row: span 3;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }

    #title {
        grid-column: span 2;
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }

    #rate, #point {
        color: #4682B4;
        font-weight: bold;
    }
`;
const QuestListItem = ({vo}) => {

    const navigate = useNavigate();
    const handleClickQuestList = () => {
        navigate('/quest/detail', { state:  {vo}  });
    };
    console.log("아아아아아아",vo);
    return (
        <StyledWrqpDiv onClick={handleClickQuestList}>
            <div id="img">
                <img src={vo.imgPath} alt="퀘스트이미지" />
            </div>
            <div id="title">{vo.title.length >= 4 ? `${vo.title.slice(0, 5)}` : vo.title}</div> 
            <div id="queCate">{vo.categoryName}</div>
            <div id="headCnt"> {vo.headCnt} 명</div>
            <div id="rate">⭐   {vo.rating}</div>
            <div id="point">💰  {vo.point}</div>
            
            
            {vo.rejecReason !== null ? (
                <div>{vo.rejecReason} </div>
            ) : null}
            
                
            
        </StyledWrqpDiv>
    );
};

export default QuestListItem;