import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginMemory } from './context/LoginContext';

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
`;


const CommunityDetail = () => {
    let loginNumber ='';
    if(sessionStorage.getItem('loginInfo')){
        loginNumber = sessionStorage.getItem('loginInfo');
    }
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();
    const location = useLocation();
    const vo = location.state.vo;

    useEffect( ()=>{
        setLoginInfo({no : loginNumber});
    }, [] )

    

    //게시글 삭제
    const handleDeleteButton = () => {
        
        fetch("http://127.0.0.1:8888/questrip/api/community/detail/delete", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, 
            body: JSON.stringify({ no: vo.no })
        }).then(resp => resp.json())
        .then(
            navigate("/community/list")
        )
    }

    // 게시글 추천 버튼 클릭 시 동작하는 함수 예시
    const handleLikeButtonClick = async () => {
        const sessionData = sessionStorage.getItem('loginInfo');
        if (sessionData == null){
            alert("로그인 후 이용해주세요");
            window.location.reload();
        }else{
            const memberNo = loginMemberVo.no;
            const boardNo = vo.no;
            const alreadyLiked = await checkIfAlreadyLiked(memberNo, boardNo);
            console.log("클라이언트에서 넘기는 값: "+ memberNo, boardNo);
            console.log(alreadyLiked);
            if (alreadyLiked) {
                console.log('이미 추천한 게시글입니다.');
                // 이미 추천한 게시글에 대한 처리 (예: decreaseLikes 함수 호출)
                decreaseLikes(memberNo, boardNo);  // 해당 함수를 호출하면 추천 취소 기능을 수행할 수 있습니다.
            } 
            else {
                console.log('아직 추천하지 않은 게시글입니다.');
                // 추천 버튼 활성화 또는 추천 로직 구현
                increaseLikes(memberNo, boardNo);  // 해당 함수를 호출하면 추천 기능을 수행할 수 있습니다.
            }
        }
        
    };

    // 이미 추천한 게시글인지 확인하는 함수
    const checkIfAlreadyLiked = async (memberNo, boardNo) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/community/checkIfAlreadyLiked", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo, boardNo })
            });
    
            if (!response.ok) {
                throw new Error('서버 응답 실패');  
            }
    
            const data = await response.json();
            return data;
    
        } catch (error) {
            console.error('이미 추천한 게시글 확인 중 에러 발생:', error);
            return false;
        }
    };
    
    // 추천을 증가시키는 함수
    const increaseLikes = async (sessionMemberNo, boardNo) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/community/detail/increaseLikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo: sessionMemberNo, boardNo: boardNo})
            });
            if (!response.ok) throw new Error('서버 응답 실패');
            const updatedBoardDetail = await response.json();
            // window.location.reload();
            console.log("증가 : "+updatedBoardDetail);

        } catch (error) {
            console.error("추천 수를 증가시키는 중 에러 발생:", error);
        }
    };

    // 추천을 감소시키는 함수
    const decreaseLikes = async (sessionMemberNo, boardNo) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/community/detail/decreaseLikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo: sessionMemberNo, boardNo: boardNo})
            });
            if (!response.ok) throw new Error('서버 응답 실패');
            const updatedBoardDetail = await response.json();
            // window.location.reload();
            console.log("감소 : "+updatedBoardDetail);
        } catch (error) {
            console.error("추천 수를 감소시키는 중 에러 발생:", error);
        }
    };
    
    const navigate = useNavigate();

    return (
        <StyledCommunityDetailDiv>
            <div>{vo.title}</div>
            <div className='writeDate'>작성일 : {vo.enrollDate}</div>
            
            <div>작성자 : {vo.nick}</div>
            <div>추천수 : {vo.likesCount}</div>
            <div>조회수 : {vo.hit}</div>
            <div className='main'>{vo.content}</div>
            {
            loginMemberVo && loginMemberVo.nick === vo.nick ? (
                <button id='like' disabled>추천</button>
                
            ) : (
                <button id='like' onClick={handleLikeButtonClick}>추천</button>
            )
             }
            <div></div>
            {/* 세션 스토리지의 id값과 boardDetailVo의 memberNo 비교 */}
            {sessionStorage.getItem("loginInfo") && loginMemberVo.nick === vo.nick ? (
            <>
                <div className='login'>수정</div>
                <div className='login' onClick={handleDeleteButton}>삭제</div>
            </>
            ) : 
            <>
                <div></div>
                <div></div>
            </>}

            <div></div>
            <div></div>
            <div onClick={ ()=> {
                navigate("/community/list");
            }}>목록으로</div>
        </StyledCommunityDetailDiv>
    );
    
};

export default CommunityDetail;
