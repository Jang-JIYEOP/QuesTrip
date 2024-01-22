import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../page/Page';
import { useNavigate } from 'react-router-dom';
    
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
            tr > th:nth-child(2){
                width: 200px;
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
    
    const CompleteList = () => {
        const navigate = useNavigate();
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
      
    const handleRowClick = (vo) => {
        navigate('/admin/complete/detail', { state:  {vo}  });
    };
    
    const loadBoardVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/complete/list",{
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
                            <th>닉네임</th>
                            <th>퀘스트명</th>
                            <th>평점</th>
                            <th>요청시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardVoList.map((vo) => (
                            <tr key={vo.no} onClick={() => handleRowClick(vo)}>
                                <td>{vo.memberName}</td>
                                <td>{vo.questName}</td>
                                <td>{vo.rate}</td>
                                <td>{vo.comTime}</td>
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
    
    export default CompleteList;
    