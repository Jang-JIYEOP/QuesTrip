import React from 'react';
import styled from 'styled-components';
import { QuestMemoryProvider, useQuestMemory } from '../community/context/QuestContext';
import QuestListItem from './QuestListItem';

const StyledQuestListDiv = styled.div`
  width: 100% ;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3fr 9fr 1fr;
  place-items: center center;
  
  & > div {
    width: 100%;
    height: 100%;
  }
  
  & #searchArea{
    grid-column: span 3;
    border: 1px solid black;
    & > form{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      place-items: center center;
      & >div  {
        width: 100%;
        height: 100%;
        & > select {
          width: 200px;
        }
    }
    }  
  }

  & #itemArea{
    width: 100%;
    height: 100%;
    grid-column: span 3;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center center;
    & > div {
      width: 80%;
      height: 80%;
      border: 1px solid red;

    }
    
    
  }
  #pageArea{
    grid-column: span 3;
  }
`;


const QuestList = () => {

  
  const {questVoList, setSearchInfoVo} = useQuestMemory();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const locCateNo = event.target.locCateNo.value;
    const point = event.target.point.value;
    const queCateNo = event.target.queCateNo.value;
    const headCnt = event.target.headCnt.value;
    const title = event.target.title.value;

    setSearchInfoVo({
        locCateNo,
        point,
        queCateNo,
        headCnt,
        title,
    });
  };

    return (
        <StyledQuestListDiv>
          <div id='searchArea'>
            <form onSubmit={handleSearchSubmit}>
              <div>
                <b>지역</b>
                <br />
                <select name="locCateNo">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              
              <div>
                <b>포인트</b>
                <br />
                <select name="point">
                  <option value="50">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div> 

              <div>
                <b>분류</b>
                <br />
                <select name="queCateNo">
                  <option value="">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div> 

              <div>
                <b>인원수</b>
                <br />
                <select name="headCnt">
                  <option value="">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div> 
              
              <div>
                <b>제목</b>
                <br />
                <input name = "title" type="text"/>
              </div>  
               
              <div>
                <input type="submit" value="검색" />
              </div>
            </form>
          </div>
          <div id='itemArea'>
            {questVoList.map( (vo) => {
              console.log(vo);
                  return <QuestListItem key = {vo.no} title ={vo.title} content={vo.content}/>
                }
              )
            }
          </div>
          <div id='pageArea'></div>
        </StyledQuestListDiv>
    );
};

export default QuestList;