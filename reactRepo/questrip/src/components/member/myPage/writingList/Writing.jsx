import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../../page/Page';
import { useNavigate } from 'react-router';

const StyledWritingDiv = styled.div`
    width: 100% ;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3fr 12fr 1fr;
    place-items: center center;
    & > div {
        border : 1px solid gray;
    }

    
    
    & #searchArea{
        width: 100%;
        height: 100%;

        & button {
        width: 50%;
        height: 50%;
    }

    }

    & #itemArea{
        width: 100%;
        height: 100%;
        grid-column: span 2;
        & > div {
            width: 80%;
          height: 80%;
          border: 1px solid red;
          
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

        #searchArea{
            width: 100% ;
            height: 100%;
            grid-column: span 2;
            
        }
        #pageArea{
            width: 100%;
            height: 100%;
        grid-column: span 2;
      }
    }
`;

const Writing = () => {

    const navigate = useNavigate();
    const [boardVoList , setBoardVoList] = useState([]);
    const [pageTotal, setPageTotal] = useState([]);
    let loginNumber = '';
    if(sessionStorage.getItem('loginInfo')){
         loginNumber = sessionStorage.getItem('loginInfo');
    }
    
    const [searchInfoVo , setSearchInfoVo] = useState({
        memberNo : loginNumber,
        pageNo : 1,
        limit : 10,
    }
    );
    const [type, setType] =useState({
        nowType : "community/myCommunityList",
    });
    
    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
        }));
      };
    
      const changeMyIcon = () => {
        setSearchInfoVo((prevSearchInfoVo) => ({
            ...prevSearchInfoVo,
            pageNo: 1,

          }));
        setType({
            nowType : "diary/myDiaryList",
        })
    };
    const changeShop = () => {
        setSearchInfoVo((prevSearchInfoVo) => ({
            ...prevSearchInfoVo,
            pageNo: 1,

          }));
        setType({
            nowType : "community/myCommunityList",
        })
    };
    const loadBoardVoList = () => {
        fetch(`http://127.0.0.1:8888/questrip/api/${type.nowType}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(searchInfoVo),
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("토탈 페이지",data.pageTotal);
            console.log("리스트",data.voList);
            
            setBoardVoList(data.voList);
            setPageTotal(data.pageTotal);
    
        });
    
    }
    const handleRowClick = (id) => {
        // 클릭한 게시글의 상세 페이지로 이동
        navigate(`/community/detail/${id}`);
        
    };


    useEffect( () => {
        loadBoardVoList();
    }, [searchInfoVo,type] );


    return (
        <StyledWritingDiv>
            <div id="searchArea">
                <button onClick={changeShop}>자유게시판</button>
                {loginNumber&& (
                    <button onClick={changeMyIcon}>일기</button>
                )}
            </div>
            <div id="itemArea">
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
            </div>
            <div id='pageArea'>
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
            </div>
        </StyledWritingDiv>
    );
};

export default Writing;