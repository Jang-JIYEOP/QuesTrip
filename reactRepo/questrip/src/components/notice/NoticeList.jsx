import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../page/Page';
import { useLoginMemory } from '../community/context/LoginContext';

const NoticeList = () => {

    const StyledNoticeListDiv = styled.div`
    width: 100%;
    height: 100%;
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    #search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    form {
        display: flex;
        align-items: center;
        select, input[type="text"] {
            margin-right: 10px;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
            outline: none;
        }
        input[type="submit"] {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            background-color: #4682B4;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        input[type="submit"]:hover {
            background-color: #357ca5;
        }
    }
}
    & > table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 8px; /* 모서리 둥글게 */
        & > thead > tr > :nth-child(1){
            
            width: 500px;
        }
        &  tr {
            height: 40px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
            transition: background-color 0.3s ease; /* 부드러운 전환 효과 */

            &:hover {
                background-color: #87CEEB; /* 하늘색 */
            }
        }

        & > thead > tr > th {
            padding: 10px;
            background-color: #4682B4; /* 더 진한 파란색 */
            color: white;
            text-align: left;
            border-radius: 8px 8px 0 0; /* 상단 모서리만 둥글게 */
        }

        & > tbody > .bestThree {
            background-color: #d3d3d3; /* 연한 회색 */
        }

        & > tbody > tr > td {
            padding: 10px;
        }
    }

    & > #pageArea {
        margin-top: 20px;
    }

    & > button {
        padding: 10px;
        background-color: #4682B4; /* 더 진한 파란색 */
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s ease; /* 부드러운 전환 효과 */

        &:hover {
            background-color: #357ca5; /* 더 진한 파란색 */
        }
    }
`;

const navigate = useNavigate(); 

const [boardVoList , setBoardVoList] = useState([]);
const [pageTotal, setPageTotal] = useState([]);

const loginNumber = sessionStorage.getItem('loginInfo');
const {setLoginInfo} = useLoginMemory();
const [searchInfoVo , setSearchInfoVo] = useState({

    pageNo : 1,
    limit : 14,

}
);

const handlePageChange = (pageNumber) => {
    setSearchInfoVo((prevSearchInfoVo) => ({
      ...prevSearchInfoVo,
      pageNo: pageNumber,
    }));
  };
  
const handleRowClick = (vo) => {
    navigate('/notice/detail', { state:  {vo}  });
};
const loadBoardVoList = () => {
    fetch("http://127.0.0.1:8888/questrip/api/notice/list",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body : JSON.stringify(searchInfoVo),
    })
    .then(resp => resp.json())
    .then(data => {
        setBoardVoList(data.voList);
        setPageTotal(data.pageTotal);

    });

}
const handleSearchSubmit = (event) => {
    event.preventDefault();
    const search = event.target.search.value;
    const searchContent = event.target.searchContent.value;

    setSearchInfoVo({
        search,
        searchContent,
        pageNo : 1,
        limit : 10,
    });

  };
useEffect( () => {
    if(loginNumber !== null){
        setLoginInfo({no : loginNumber});
    }
    loadBoardVoList();
    
}, [searchInfoVo] );

    return (
        <StyledNoticeListDiv>
            <div id="search">
                <form onSubmit={handleSearchSubmit}>
                    <select name="search">
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                    </select>
                    <input type="text" name='searchContent' id='searchInput' />
                    <input type="submit" value="검색" />
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성일시</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        boardVoList.length === 0 
                        ?
                        <h1>로딩중...</h1>
                        :
                        boardVoList.map( vo => 
                        <tr key={vo.no} onClick={() => handleRowClick(vo)}>
                            <td>{vo.title}</td>
                            <td>{vo.enrollDate}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
            <div id="pageArea">
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
                
            </div>
        </StyledNoticeListDiv>
    );
};

export default NoticeList;