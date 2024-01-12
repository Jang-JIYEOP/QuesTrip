import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuestMemory } from '../community/context/QuestContext';

const NoticeDetail = () => {
    
    const StyledQuestListDiv = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 3fr 1fr;
grid-template-rows: 1fr 9fr 1fr;
place-items: center center;

& > div {
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
}
#content{
    grid-column: span 2; 
    
}

& button {
    grid-column: span 2; 

}
`;
const navigate = useNavigate(); 
const location = useLocation();
const vo = location.state.vo;
const {setSearchInfoVo} = useQuestMemory();
useEffect(() => {
     
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
    <div id='content'>내용 : {vo.content}</div>
    <button onClick={() => handleBackClick(vo)}>목록으로</button>
</StyledQuestListDiv>
);
};

export default NoticeDetail;