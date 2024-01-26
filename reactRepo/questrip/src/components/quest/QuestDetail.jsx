import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MapContainer from '../map/MapContainer';
import { useQuestMemory } from '../community/context/QuestContext';
import Modal from './Modal';
import { useLoginMemory } from '../community/context/LoginContext';

const StyledQuestListDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  padding: 20px;
  margin-bottom: 20px; 
  #img {
    grid-column: span 3;
    border-radius: 10px;
    overflow: hidden;
  }
  #map {
    grid-column: span 2;
    border-radius: 10px;
    overflow: hidden;
  }
  #map {
    height: 400px;
  }
  #img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #content{
    grid-column: span 5;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: left;
    justify-content: left;
    font-size: 1.2rem;
    text-align: left;
  }
  #title, #headCnt, #queCateNo, #rating,  #point {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    text-align: center;
  }
  #point {
    flex-direction: column;
    gap: 10px;
  }
  #point button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #4682B4;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #357ca5;
    }
  }
  #modal {
    width: 400px;
    height: 300px;
  }
`;



const QuestDetail = () => {

  const {setLoginInfo} = useLoginMemory();
  const loginNumber = sessionStorage.getItem('loginInfo');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [pointZIndex, setPointZIndex] = useState(1);

  const closeModal = () => {
    setModalOpen(false);
    setPointZIndex(1); 
  };
  const location = useLocation();
  const vo = location.state.vo;
  const { setSearchInfoVo } = useQuestMemory();
  console.log(vo);
  useEffect(() => {
    if(loginNumber !== null){
      setLoginInfo({no : loginNumber});
  }

    setSearchInfoVo({
      locCateNo: 1,
      pageNo: 0,
      limit: 0,
    });
  }, []);

  return (
    <StyledQuestListDiv>
      <div id="map">
        <MapContainer vo={vo} />
      </div>
      <div id="img">
        <img src={vo.imgPath} alt="퀘스트예시사진" />
      </div>
      
      <div id="title">🎯{vo.title}</div>
      <div id="headCnt">👬 {vo.headCnt}명</div>
      <div id="queCateNo">{vo.categoryName}와(과) 함께</div>
      <div id="rating">🍀 {vo.rating}</div>
      <div id="point" style={{ zIndex: pointZIndex }}>
        <div>💰 {vo.point}</div>
        <button
          className="btn"
          onClick={() => {
            console.log('실행');
            setModalOpen(true);
            setPointZIndex(0); // modal이 열릴 때 point의 z-index 값을 0으로 변경합니다.
          }}
        >
          퀘스트 수행하기
        </button>
        <Modal isOpen={modalOpen} closeModal={closeModal} questNo = {vo.no} memberNo = {loginNumber}/>
      </div>
            <div id="content">{vo.content}</div>
    </StyledQuestListDiv>
  );
};

export default QuestDetail;
