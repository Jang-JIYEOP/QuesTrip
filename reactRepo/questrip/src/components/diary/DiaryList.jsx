import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../page/Page';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginMemory } from '../community/context/LoginContext';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';


const StyledDiaryListDiv = styled.div`
   width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    #searchArea {
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
    const location = useLocation();
    
    const searchVo = location.state ? location.state.searchVo : null;
    const [searchInfoVo , setSearchInfoVo] = useState({
        search: searchVo? searchVo.search : '',
        searchContent: searchVo? searchVo.searchContent : '',
        pageNo : 1,
        limit : 10,
    
    }
    );
    const loginNumber = sessionStorage.getItem('loginInfo');
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();

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
        if(loginNumber !== null){
            setLoginInfo({no : loginNumber});
        }
    }, [searchInfoVo] );

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        const searchContent = event.target.searchContent.value;
        setSearchInfoVo({
            search,
            searchContent,
            pageNo: 1,
            limit: 10,
        })
    }

    return (
        <StyledDiaryListDiv>
            <div id='searchArea'>
                <form onSubmit={handleSearchSubmit}>
                    <select name="search">
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="writer">작성자</option>
                    </select>
                    <input type="text" name='searchContent' id='searchInput' />
                    <input type="submit" value="검색" />
                </form>
            </div>


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