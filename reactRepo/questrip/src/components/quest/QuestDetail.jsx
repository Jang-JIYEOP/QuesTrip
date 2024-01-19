import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MapContainer from '../map/MapContainer';
import { useQuestMemory } from '../community/context/QuestContext';
import Modal from './Modal';

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
  #map {
    grid-column: span 2;
  }
  #img {
    grid-column: span 2;
  }
  #content {
    grid-column: span 3;
  }
  #modal {
  width: 400px;
  height: 300px;
}
`;



const QuestDetail = () => {
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
      <div id="title">위치이름: {vo.title}</div>
      <div id="headCnt">인원수: {vo.headCnt}</div>
      <div id="queCateNo">분류: {vo.queCateNo}</div>
      <div id="rating">평균 별점: {vo.rating}</div>
      <div id="content">내용: {vo.content}</div>
      <div id="point" style={{ zIndex: pointZIndex }}>
        <div>포인트: {vo.point}</div>
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

        <Modal isOpen={modalOpen} closeModal={closeModal}/>



      </div>
    </StyledQuestListDiv>
  );
};

export default QuestDetail;
