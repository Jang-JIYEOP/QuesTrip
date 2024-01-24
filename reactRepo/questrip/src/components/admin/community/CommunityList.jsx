import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../page/Page';

const StyledListDiv = styled.div`
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
const CommunityList = () => {
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


    // const handleRowClick = (id) => {
    //     // 클릭한 게시글의 상세 페이지로 이동
    //     navigate(`/community/detail/${id}`);
        
    // };


    
    //fetch 를 이용해서 데이터 준비
    const [boardVoList , setBoardVoList] = useState([]);
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
                    <th>작성자</th>
                    <th>제목</th>
                    <th>조회수</th>
                    <th>작성일자</th>
                    <th>삭제여부</th>
                    </tr>
                </thead>
                <tbody>
                    {boardVoList.map((vo) => (
                        <tr key={vo.no}>
                            <td>{vo.memberName}</td>
                            <td>{vo.title}</td>
                            <td>{vo.hit}</td>
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

export default CommunityList;
