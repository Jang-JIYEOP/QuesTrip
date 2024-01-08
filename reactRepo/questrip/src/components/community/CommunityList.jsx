import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledCommunityListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
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


const CommunityList = () => {


    const navigate = useNavigate();

    const handleRowClick = (id) => {
        // 클릭한 게시글의 상세 페이지로 이동
        navigate(`/community/detail/${id}`);
        
    };

    //fetch 를 이용해서 데이터 준비
    const [boardVoList , setBoardVoList] = useState([]);
    const [boardBestList, setBoardBestList] = useState([]);
    const loadBoardVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/community/list")
        .then(resp => resp.json())
            .then(data => {
                setBoardVoList(data.voList);
                setBoardBestList(data.bestList);
            });

    }
    
    useEffect( () => {
        loadBoardVoList();
        
    }, [] );


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
                                <td>{vo.likes}</td>
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
                            <td>{vo.likes}</td>
                            <td>{vo.enrollDate}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>

            
            <button onClick={ () => {
                navigate("/community/write");
            } }>게시글 작성하기</button>
        </StyledCommunityListDiv>
    );
};

export default CommunityList;