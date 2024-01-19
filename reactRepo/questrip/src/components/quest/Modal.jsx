import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const customModalStyles = {
    // 여기가 모달창 밖에 부분 처리
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    // 여기가 모달창 안쪽영역 
    content: {
      width: "600px",
      height: "400px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
     
    },
  };


  const ModalDiv =  styled.div`
  form{

    
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 5fr 1fr 1fr 1fr;
    #img {
      grid-column: span 4;
    }
    .text{
      grid-column: span 3;
    }
    #combtn{
      grid-column: span 2;
      margin-left: 190px;
    }
    #close{
      grid-column: span 2;
      
      margin-left: 50px;
      
    }
    
    #fbtn{
      width: 100%;
      & input{
        width: 77px;
        
      }
      
    }
    #rate {
      /* width: 100%;
      & select {
        width: 50px;
        margin-left: 50px
      } */
    }
      
    }
    `;

    
    const Modal = ({ isOpen,closeModal, questNo, memberNo}) => {
      const [selectedImage, setSelectedImage] = useState(null);
      const [fileObj,setFileObj] = useState();
      
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileObj(event.target.files[0]);
        
        if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
    
  const handleSubmit = (event) =>{
    console.log("함수실행");
    event.preventDefault();

    const rate = event.target.rate.value;
    
    const fd = new FormData();
    fd.append("file", fileObj);
    fd.append("questNo", questNo);
    fd.append("rate" , rate);
    fd.append("memberNo" , memberNo);
    
    fetch("http://127.0.0.1:8888/questrip/api/quest/complete" , {
        method: "POST",
        body : fd ,
    })
    .then( resp => resp.json() )
    .then( data => {
        if(data.msg === "good"){
            alert("퀘스트 작성 완료 !");
        }else{
            alert("퀘스트 작성 실패 ...");
        }
    } )
    ;
}

    return (
        <ReactModal
        isOpen={isOpen}
        style={customModalStyles}
      >

      <ModalDiv>
        <form onSubmit={handleSubmit}>

      <div id="img">
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
          ) : (
            '이미지'
            )}
      </div>
          <div className="text">이미지를 선택하세요(필수)</div>
          <div id="fbtn">
            <input type="file" multiple name="file" onChange={handleFileChange}/>
          </div>
          <div className="text">이번 퀘스트는 어떠셨나요? 평점을 매겨주세요!!</div>
          <div id="rate">
            <select name="rate">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
              <option value="1">5</option>
            </select>
          </div>
          <div id="combtn">
            <input type="submit" value="완료 신청"/>

          </div>
          <div id="close">
            <button type='button' onClick={closeModal}>닫기</button>
          </div>
            </form>
          
      </ModalDiv>
        
      </ReactModal>
    );
};

export default Modal;