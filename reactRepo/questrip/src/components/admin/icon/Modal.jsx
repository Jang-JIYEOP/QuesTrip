import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

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
  width: 100%;
  height: 85%;
  h2 {
    text-align: center;
  }
  form{

    
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr;
    grid-template-rows: 3fr 3fr 1fr ;

    #img{
      width: 100%;
      height: 100%;
      grid-row: span 2;
    }
    
    #title{
      margin-top: 25%;
      width: 100%;
      height: 100%;
      grid-column: span 2;
    }
    
    #point{
      margin-top: 10%;
      width: 100%;
      height: 100%;
      grid-column: span 2;

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
  const navigate = useNavigate();
  const handleSubmit = (event) =>{
    event.preventDefault();

    const title = event.target.title.value;
    const price = event.target.point.value;

    
    const fd = new FormData();
    fd.append("file", fileObj);
    fd.append("title", title);
    fd.append("price", price);

    
    fetch("http://127.0.0.1:8888/questrip/api/icon/insert" , {
        method: "POST",
        body : fd ,
    })
    .then( resp => resp.json() )
    .then( data => {
        if(data.msg === "good"){
            alert("아이콘 등록 완료 !");
            window.location.reload();
        }else{
            alert("아이콘 등록 실패 ...");
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
        <h2> 아이콘 등록</h2>
        <form onSubmit={handleSubmit}>
        <div id="img">
          {selectedImage ? (
            <img src={selectedImage} alt="선택이미지" style={{ width: '100%', height: '100%' }} />
            ) : (
              '이미지를 선택해 주세요'
          )}
        </div>
        <div id="title">
              이름 : <input type="text" name="title" />
        </div>

        <div id="point">
          포인트 : <select name="point">
            <option value="50">50p</option>
            <option value="100">100p</option>
            <option value="150">150p</option>
            <option value="200">200p</option>
            <option value="250">250p</option>
          </select>
        </div>
        
        <div id="fbtn">
          <input type="file" multiple name="file" onChange={handleFileChange}/>
        </div>

        <div id="combtn">

          <input type="submit" value="등록"/>
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