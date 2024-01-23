import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuestMemory } from '../community/context/QuestContext';
import QuestListItem from './QuestListItem';
import Page from '../page/Page';

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

  
  const {questVoList, searchInfoVo, setSearchInfoVo, pageTotal, handlePageChange} = useQuestMemory();
  const [locateCategoryVoList, setLocateCategoryVoList] = useState([]);
  const [questCategoryVoList, setQuestCategoryVoList] = useState([]);

  const loadLocateCategoryVoList = () => {
    fetch("http://127.0.0.1:8888/questrip/api/locatecategory/list")
    .then(resp => resp.json())
    .then(data => {
        setLocateCategoryVoList(data);
    });
  }

  const loadQuestCategoryVoList = () => {
    fetch("http://127.0.0.1:8888/questrip/api/questcategory/list")
    .then(resp => resp.json())
    .then(data => {
        setQuestCategoryVoList(data);
    });
  }

  useEffect(() => {
    loadQuestCategoryVoList();
    loadLocateCategoryVoList();
    setSearchInfoVo({
      locCateNo : 1,
      pageNo : 1,
      limit : 6,
    });
  },[]);
  
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
        pageNo : 1,
        limit : 6,
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
                  {locateCategoryVoList.map((lcvl) => 
                    <option key={lcvl.no} value={lcvl.no}>{lcvl.name}</option>
                  )}
                </select>
              </div>
              
              <div>
                <b>포인트</b>
                <br />
                <select name="point">
                  <option value=''>-</option>
                  {Array.from({length: 10}, (_, i) => (i + 1) * 50).map((num) => 
                    <option key={num} value={num}>{num}</option>
                  )}
                </select>
              </div>

              <div>
                <b>분류</b>
                <br />
                <select name="queCateNo">
                  <option value=''>-</option>
                {questCategoryVoList.map((qcvl) => 
                  <option key={qcvl.no} value={qcvl.no}>{qcvl.name}</option>
                )}
                </select>
              </div> 

              <div>
                <b>인원수</b>
                <br />
                <select name="headCnt">
                  <option value=''>-</option>
                  {Array.from({length: 10}, (_, i) => i + 1).map((num) => 
                    <option key={num} value={num}>{num}명</option>
                  )}
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
                  return <QuestListItem key = {vo.no} vo = {vo} />
                }
              )
            }
          </div>
          <div id='pageArea'>
            <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
          </div>
        </StyledQuestListDiv>
    );
};

export default QuestList;