import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuestMemory } from '../community/context/QuestContext';
import QuestListItem from './QuestListItem';
import Page from '../page/Page';

const StyledQuestListDiv = styled.div`
  width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 30px;
    place-items: start center;
  & > div {
    width: 100%;
    height: 90%;
  }
  
  #searchArea {
    grid-column: span 3;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1);
}

#searchArea form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

#searchArea form div {
    display: flex;
    flex-direction: column;
}

#searchArea form b {
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #333;
}

#searchArea form select, #searchArea form input[type="text"] {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

#searchArea form input[type="submit"] {
    padding: 10px;
    border: none;
    color: #fff;
    background-color: #4682B4;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

#searchArea form input[type="submit"]:hover {
    background-color: #357ca5;
}

#itemArea {
    grid-column: span 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    place-items: start center;
}

#itemArea div {
    width: 90%;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    padding: 15px;
}

#pageArea {
    grid-column: span 3;
    display: flex;
    justify-content: center;
    align-items: center;
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