import React, { useEffect, useState } from 'react';
import QuestListItem from '../../../quest/QuestListItem';
import Page from '../../../page/Page';
import { useLoginMemory } from '../../../community/context/LoginContext';
import { useQuestMemory } from '../../../community/context/QuestContext';
import styled from 'styled-components';

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


const ComQuestList = () => {

  
const loginNumber = sessionStorage.getItem('loginInfo');
const {setLoginInfo} = useLoginMemory();
const [comQuestVoList,setComQuestVoList] = useState();
const [pageTotal, setpageTotal] = useState([]);
const [searchInfoVo,setSearchInfoVo] = useState({
    pageNo : 1,
      limit : 4,
});

const loadQuestCategoryVoList = () => {
    fetch("http://127.0.0.1:8888/questrip/api/complete/mylist",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(searchInfoVo),
    })
    .then(resp => resp.json())
    .then(data => {
        setComQuestVoList(data);
        setpageTotal(data.pageTotal);
        console.log(pageTotal);
        console.log(comQuestVoList);
    });
  }

  
  useEffect(() => {
    if(loginNumber !== null){
      setLoginInfo({no : loginNumber});
  }
    loadQuestCategoryVoList();
  },[searchInfoVo]);


  const handlePageChange = (pageNumber) => {
    setSearchInfoVo((prevSearchInfoVo) => ({
      ...prevSearchInfoVo,
      pageNo: pageNumber,
    }));
  };
 
    return (
        <StyledQuestListDiv>
          <div id='itemArea'>
            {/* {comQuestVoList.map( (vo) => {
                  return <QuestListItem key = {vo.no} vo = {vo} />
                }
              )
            } */}
          </div>
          <div id='pageArea'>
            <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
          </div>
        </StyledQuestListDiv>
    );
};

export default ComQuestList;