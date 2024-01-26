import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "400px",
    height: "350px",
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

const ModalDiv = styled.div`
  width: 100%;
  height: 85%;
  h2 {
    text-align: center;
  }
  form {
    width: 100%;
    height: 100%;
    display: grid;

    #title {
      display: ${props => (props.showReason ? "block" : "none")};
      width: 100%;
      height: 50%;
    }
    input {
      width: 70%;
      & button{
        width: 10%;

      }
    }

    #combtn {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 50px;
      text-align: center;
    }
    #close {
      text-align: center;
    }
  }
`;

const Modal = ({ isOpen, closeModal, vo}) => {
  const [showReason, setShowReason] = useState(false); // 반려사유 표시 여부
  const [comleteVo, setComleteVo] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(event.target.title.value!==''){
      setComleteVo({
        no : vo.no,
        rejecReason : event.target.title.value,
        
        state : 3,
      });}
      else{
        setComleteVo({
          no : vo.no,
          state : 2,
          point: vo.point,
          memberNo : vo.memberNo,
      })
    }
  };


  const updateComplete = () => {
    fetch("http://127.0.0.1:8888/questrip/api/complete/update",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body : JSON.stringify(comleteVo),
    })
    .then(resp => resp.json())
    .then(data => {
        if(data.msg === "good"){
          alert("처리 성공!")
          navigate("/admin/complete/list");
        }else{
          alert("처리 실패!")
          window.location.reload();
        }
    });

}

  useEffect( () => {
    updateComplete();
  }, [comleteVo] );

  


  const handleReject = () => {
    setShowReason(true); 
    
  };

  return (
    <ReactModal isOpen={isOpen} style={customModalStyles}>
      <ModalDiv showReason={showReason}>
        <h2> 퀘스트 처리 </h2>
        <form onSubmit={handleSubmit}>

          <div id="combtn">
            <button type='button' onClick={handleReject}>반려 처리</button>
            <button type = 'submit' >퀘스트 성공 처리</button>
          </div>

          <div id="title">
            반려사유 <input type="text" name="title" />
            <button type='submit'>제출</button>
          </div>

          <div id="close">
            <button type="button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </form>
      </ModalDiv>
    </ReactModal>
  );
};

export default Modal;
