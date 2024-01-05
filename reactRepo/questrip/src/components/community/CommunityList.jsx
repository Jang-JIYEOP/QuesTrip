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
        height: 70%;
        
    }
`;


const CommunityList = () => {

    console.log("BoardList 컴포넌트 렌더링 ~~~ ");

    const navigate = useNavigate();

    //fetch 를 이용해서 데이터 준비
    const [boardVoList , setBoardVoList] = useState([]);
    const loadBoardVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/board/list")
        .then( resp => resp.json() )
        .then( (x) => { setBoardVoList(x); } )
        ;
    }

    useEffect( () => {
        console.log("useEffect 호출됨 ~~~");
        loadBoardVoList();
    }, [] );


    return (
        <StyledCommunityListDiv>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>추천수</th>
                        <th>작성일시</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardVoList.length === 0 
                        ?
                        <h1>로딩중...</h1>
                        :
                        boardVoList.map( vo => <tr key={vo.no}>
                            <td>{vo.no}</td>
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
                navigate("/board/write");
            } }>게시글 작성하기</button>
        </StyledCommunityListDiv>
    );
};

export default CommunityList;