import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginMemory } from './context/LoginContext';
import Page from '../page/Page';

const StyledCommunityListDiv = styled.div`
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
        }
    }
`;


const CommunityList = () => {
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();
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
        navigate(`/community/detail/${id}`);
        
    };

    //fetch 를 이용해서 데이터 준비
    const [boardVoList , setBoardVoList] = useState([]);
    const [boardBestList, setBoardBestList] = useState([]);
    const loadBoardVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/community/list", {
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
                setBoardBestList(data.bestList);
            });
    }
    useEffect( () => {
        loadBoardVoList();
        
    }, [searchInfoVo] );

    return (
        <StyledCommunityListDiv>
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
                        boardBestList.map(vo => 
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
                        boardVoList.length === 0 
                        ?
                        <h1>로딩중...</h1>
                        :
                        boardVoList.map( vo => 
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

            </div>
            
            <button onClick={ () => {
                navigate("/community/write");
            } }>게시글 작성하기</button>
        </StyledCommunityListDiv>
    );
};

export default CommunityList;