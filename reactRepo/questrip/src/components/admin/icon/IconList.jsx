import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconListItem from './IconListItem';
import Modal from './Modal';

const StyledIconListDiv = styled.div`
    width: 100% ;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 15fr 1fr 1fr;
    place-items: center center;
    & #itemArea{
        margin: 3%;
        width: 90%;
        height: 90%;
        grid-column: span 3;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        place-items: center center;
    }
    #write{
        width: 100%;
        height: 100%;
        grid-column: span 3;
        
        border: 1px solid gray;
        & button{
            width: 15%;
            height: 80%;
            margin-left: 80%;

        }
    }
    #pageArea{
            width: 100%;
            height: 100%;
        grid-column: span 3;
      }
`;

const IconList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [iconVoList, setIconVoList] = useState([]);

    const loadList = () =>{
        fetch("http://127.0.0.1:8888/questrip/api/icon/listall")
            .then(resp => resp.json()) 
            .then(data => {
                setIconVoList(data);
                console.log(data);
            })
            ;
    }

    const closeModal = () => {
        setModalOpen(false);
      };
    useEffect(() => {
        loadList();
    },[]);

    return (
        <StyledIconListDiv>
            <div id='itemArea'>

                {iconVoList.map( (vo) => {
                    return <IconListItem key = {vo.no} vo = {vo}/>
                }
                )
            }
        </div>
        <div id="write">
            <button
          className="btn"
          onClick={() => {
            console.log('실행');
            setModalOpen(true);
          }}>
          퀘스트 수행하기
        </button>

        <Modal isOpen={modalOpen} closeModal={closeModal}/>

        </div>
        <div id='pageArea'></div>
        </StyledIconListDiv>
    );
};

export default IconList;