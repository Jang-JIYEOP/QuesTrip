import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../page/Page';

const NoticeList = () => {

    const StyledNoticeListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    

    
    & > table {
        width: 100%;
        &  tr {
            height: 10px;
        }

        & > tbody > tr > td {
            height: 40px;
        }

        & > thead > tr > :nth-child(1){
            
            width: 700px;
        }
    }

    & td{
        height: 20px;
    }

    #pageArea{
        width : 100%;
        height: 40px;
    }
`;

const navigate = useNavigate(); 

const [boardVoList , setBoardVoList] = useState([]);
const [pageTotal, setPageTotal] = useState([]);
const [searchInfoVo , setSearchInfoVo] = useState({

    pageNo : 1,
    limit : 10,

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
        console.log("토탈 페이지",data.pageTotal);
        console.log("토탈 페이지",data.voList);
        
        setBoardVoList(data.voList);
        setPageTotal(data.pageTotal);

    });

}

useEffect( () => {
    loadBoardVoList();
    
}, [searchInfoVo] );

    return (
        <StyledNoticeListDiv>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>조회수</th>
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
                            <td>{vo.hit}</td>
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