import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import styled from 'styled-components';
const StlyedSearchDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    place-items: center center;

    .board{
        width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .out{
        width: 100%;
        #plus{
            text-align: right;
            cursor: pointer;
            width: 100%; 

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
}
}

`;
const Seach = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const communityVoList = location.state.communityVoList;
    const diaryVoList = location.state.diaryVoList;

    console.log(diaryVoList);
    console.log(communityVoList);

    const handleRowClick = (id) => {
        // 클릭한 게시글의 상세 페이지로 이동
        navigate(`/community/detail/${id}`);
        
    };

    return ( 
        <StlyedSearchDiv>
            <div className='board'>
                <div className='out'>
                    <b>자유게시판</b>
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
                                communityVoList.length === 0 
                                ?
                                <h1>로딩중...</h1>
                                :
                                communityVoList.map( vo => 
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
                    <div id='plus'><b>+더보기</b></div>
                </div>
            </div>
            <div className='board'>
                <div className='out'>
                <b>일기 검색 목록</b>
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
                    <div id='plus'><b>+더보기</b></div>
                </div>
            </div>
        </StlyedSearchDiv>
    );
};

export default Seach;