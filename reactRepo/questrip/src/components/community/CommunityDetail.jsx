import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledCommunityDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 5fr 2fr 2fr ;
    grid-template-rows: 1fr 1fr 20fr 1fr 1fr 1fr;
    border: 1px solid black;
    text-align: center;
    & > div{                        //제목, 내용 보기 위해 사용하는 border
        border: 1px solid black;
    }
    .writeDate{
        grid-column: span 2;
    }
    .main{
        grid-column: span 3;
    }
    #like{
        grid-column: span 3;
        place-items: center;
    }
    .login{
        
    }
`;


const CommunityDetail = () => {

    const  {id} = useParams(); // URL에서 게시글의 ID를 가져옵니다.
    const [boardDetailVo, setBoardDetailVo] = useState([]); // 상세 정보를 저장할 상태 변수입니다.
    const [boardVo, setBoardVo] = useState({
        no: id
    });

    useEffect(() => {
        // API를 호출하여 게시글의 상세 정보를 가져옵니다.
        fetch(`http://127.0.0.1:8888/questrip/api/community/detail/?no=${id}`, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json" ,
            },
            body : JSON.stringify(boardVo)
        })
            .then(resp => resp.json())
            .then(boardDetailVo => {
                // 서버로부터 받은 데이터를 boardDetailVo 상태 변수에 저장합니다.
                setBoardDetailVo(boardDetailVo);
                
            })

            .catch(error => {
                console.error("게시글 상세 정보를 가져오는 중 에러 발생:", error);
            });

    }, [id]);

    const navigate = useNavigate();

    return (
        <StyledCommunityDetailDiv>
            <div>{boardDetailVo.title}</div>
            <div className='writeDate'>작성일 : {boardDetailVo.enrollDate}</div>
            
            <div>작성자 : {boardDetailVo.nick}</div>
            <div>추천수 : {boardDetailVo.likes}</div>
            <div>조회수 : {boardDetailVo.hit}</div>
            <div className='main'>{boardDetailVo.content}</div>
            <button id='like'>추천</button>
            <div></div>
            <div className='login'>수정</div>
            <div className='login'>삭제</div>
            <div></div>
            <div></div>
            <div onClick={ ()=> {
                navigate("/community/list");
            }}>목록으로</div>
        </StyledCommunityDetailDiv>
    );
    
};

export default CommunityDetail;
