import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../page/Page';

const StyledListDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > table {
        width: 100%;
        border-collapse: collapse;

        
        th, td {
            height: 15px;
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        tr > th:nth-child(1){
            width: 150px;
        }
        tr > th:nth-child(3){
            width: 200px;
        }
        tr > th:nth-child(4){
            width: 80px;
        }
        th {
            background-color: #f2f2f2;
        }

        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tbody tr:hover {
            background-color: #e0e0e0;
        }
    }

    #pageArea {
        margin-top: auto;
        width: 100%;
        text-align: center;
    }
`;

const NoticeList = () => {
    const [boardVoList , setBoardVoList] = useState([]);
const [pageTotal, setPageTotal] = useState([]);
const [searchInfoVo , setSearchInfoVo] = useState({

    pageNo : 1,
    limit : 15,

}
);

const handlePageChange = (pageNumber) => {
    setSearchInfoVo((prevSearchInfoVo) => ({
      ...prevSearchInfoVo,
      pageNo: pageNumber,
    }));
  };
  
// const handleRowClick = (vo) => {
//     navigate('/notice/detail', { state:  {vo}  });
// };

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

useEffect( () => {
    loadBoardVoList();
    
}, [searchInfoVo] );

    return (
        <StyledListDiv>
            <table>
                <thead>
                    <tr>
                    <th>작성자ID</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>삭제여부</th>
                    </tr>
                </thead>
                <tbody>
                    {boardVoList.map((vo) => (
                        <tr key={vo.no}>
                            <td>{vo.id}</td>
                            <td>{vo.title}</td>

                            <td>{vo.enrollDate}</td>
                            <td>{vo.delYn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id='pageArea'>
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
            </div>
        </StyledListDiv>
    );
};

export default NoticeList;
