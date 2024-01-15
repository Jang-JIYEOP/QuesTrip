import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../page/Page';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginMemory } from '../community/context/LoginContext';


const StyledDiaryListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    & > table {
        width: 100%;
        height: 100%;
        &  tr {
            height: 10px;
        }
        & > thead > tr > :nth-child(1){
            
            width: 700px;
        }
        & > tbody > .bestThree{
            background-color: lightgray;
            border: none;
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


    const handleRowClick = (vo) => {
        // 클릭한 게시글의 상세 페이지로 이동
        navigate('/diary/detail', {state: {vo}});
        
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
                        <tr key={vo.no} onClick={() => handleRowClick(vo)}>
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

            </div>
            
            <button onClick={ () => {
                navigate("/diary/write");
            } }>일기 작성하기</button>
        </StyledDiaryListDiv>
    );
};

export default DiaryList;