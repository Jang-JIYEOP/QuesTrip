import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuestMemory } from '../../community/context/QuestContext';
import styled from 'styled-components';
import Modal from './Modal';

const StyledQuestListDiv = styled.div`
        width: 80%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 15fr 1fr;
        place-items: center center;
        & > div {
            width: 100%;
            height: 100%;
            /* border: 1px solid lightgray; */
        }
        #content{
            
        }

        #buttons {
            width: 50%;
            display: flex;
            justify-content: space-between;
            grid-column: span 2;
            padding: 0 20px;
    }
    `;
const CompleteDetail = () => {
    const [modalOpen, setModalOpen] = useState(false);
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
    const closeModal = () => {
        setModalOpen(false);
      };
    const handleBackClick = (vo) => {
        navigate('/admin/complete/list');
    };
    return (
        <StyledQuestListDiv>
            <div id='title'>제목 : {vo.questName}</div>
            <div id='enrollDate'>작성일자 : {vo.comTime}</div>
            <div id='nick'>작성자 : {vo.memberName}</div>
            <div id='nick'>평점 : {vo.rate}</div>
            <div id='content'>내용 : {vo.content}</div>
            <div id='img'>
                <img src={vo.imgPath} alt="완료 이미지" />
            </div>
            <div id='buttons'>
                <button onClick={() => handleBackClick(vo)}>목록으로</button>
                <button 
                    className="btn"
                    onClick={() => {
                    console.log('실행');
                    setModalOpen(true);
                    }}
                >처리하기</button>

            <Modal isOpen={modalOpen} closeModal={closeModal} vo = {vo}/>
            </div>
                
        </StyledQuestListDiv>
    );
};

export default CompleteDetail;