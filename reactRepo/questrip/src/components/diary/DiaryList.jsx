import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../page/Page';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginMemory } from '../community/context/LoginContext';


const StyledDiaryListDiv = styled.div`
   width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & > table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 8px; /* 모서리 둥글게 */

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



const DiaryList = () => {
    const [pageTotal, setPageTotal] = useState([]);
    const [searchInfoVo , setSearchInfoVo] = useState({

        pageNo : 1,
        limit : 10,
    
    }
    );

    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
        }));
      };


    const handleRowClick = (id) => {
        // 클릭한 게시글의 상세 페이지로 이동
        navigate(`/diary/detail/${id}`);
        
    };

    //fetch 를 이용해서 데이터 준비
    const [diaryVoList , setDiaryVoList] = useState([]);
    const [diaryBestList, setDiaryBestList] = useState([]);
    const loadDiaryVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/diary/list", {
            method: "POST",
            headers: {
            "Content-Type": "application/json", 
            },
        body : JSON.stringify(searchInfoVo),
        })
        .then(resp => resp.json())
            .then(data => {
                setDiaryVoList(data.voList);
                setPageTotal(data.pageTotal);
                setDiaryBestList(data.bestList);
            });

    }
    
    useEffect( () => {
        loadDiaryVoList();
        
    }, [searchInfoVo] );


    return (
        <StyledDiaryListDiv>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>추천수</th>
                        <th>작성일시</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        diaryBestList.map(vo => 
                            <tr className= "bestThree" key={vo.no} onClick={() => handleRowClick(vo.no)}>
                                <td>{vo.title}</td>
                                <td>{vo.nick}</td>
                                <td>{vo.hit}</td>
                                <td>{vo.likesCount}</td>
                                <td>{vo.enrollDate}</td>
                            </tr>
                        )
                    }

                    {
                        diaryVoList.length === 0 
                        ?
                        <h1>로딩중...</h1>
                        :
                        diaryVoList.map( vo => 
                        <tr key={vo.no} onClick={() => handleRowClick(vo.no)}>
                            <td>{vo.title}</td>
                            <td>{vo.nick}</td>
                            <td>{vo.hit}</td>
                            <td>{vo.likesCount}</td>
                            <td>{vo.enrollDate}</td>
                        </tr>

                        
                        )
                    }
                </tbody>
            </table>
            <div id="pageArea">
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>

                <button onClick={ () => {
                    navigate("/diary/write");
                } }>일기 작성하기</button>
            </div>
            
        </StyledDiaryListDiv>
    );
};

export default DiaryList;