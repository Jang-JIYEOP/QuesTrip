import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginMemory } from '../community/context/LoginContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const StyledDiaryDetailDiv = styled.div`
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



const DiaryDetail = () => {
    const loginNumber = sessionStorage.getItem('loginInfo');
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();
    console.log(loginMemberVo);
    const  {id} = useParams(); // URL에서 게시글의 ID를 가져옵니다.

    const [diaryDetailVo, setDiaryDetailVo] = useState([]); // 상세 정보를 저장할 상태 변수입니다.
    
    const [diaryVo, setDiaryVo] = useState({
        no: id
    });


    useEffect(() => {
        if(loginNumber !== null){
            setLoginInfo({no : loginNumber});
        }
        // API를 호출하여 게시글의 상세 정보를 가져옵니다.
        fetch(`http://127.0.0.1:8888/questrip/api/diary/detail/?no=${id}`, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json" ,
            },
            body : JSON.stringify(diaryVo)
        })
            .then(resp => resp.json())
            .then(diaryDetailVo => {
                // 서버로부터 받은 데이터를 diaryDetailVo 상태 변수에 저장합니다.
                setDiaryDetailVo(diaryDetailVo);
                
            })

            .catch(error => {
                console.error("게시글 상세 정보를 가져오는 중 에러 발생:", error);
            });

    }, [id]);

    //게시글 삭제
    const handleDeleteButton = () => {
        
        fetch("http://127.0.0.1:8888/questrip/api/diary/detail/delete", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, 
            body: JSON.stringify({ no: diaryDetailVo.no })
        }).then(resp => resp.json())
        .then(
            navigate("/diary/list")
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
            const diaryNo = diaryDetailVo.no;
            const alreadyLiked = await checkIfAlreadyLiked(memberNo, diaryNo);
            console.log("클라이언트에서 넘기는 값: "+ memberNo, diaryNo);
            if (alreadyLiked) {
                console.log('이미 추천한 게시글입니다.');
                // 이미 추천한 게시글에 대한 처리 (예: decreaseLikes 함수 호출)
                decreaseLikes(memberNo, diaryNo);  // 해당 함수를 호출하면 추천 취소 기능을 수행할 수 있습니다.
            } 
            else {
                console.log('아직 추천하지 않은 게시글입니다.');
                // 추천 버튼 활성화 또는 추천 로직 구현
                increaseLikes(memberNo, diaryNo);  // 해당 함수를 호출하면 추천 기능을 수행할 수 있습니다.
            }
        }
        
    };

    // 이미 추천한 게시글인지 확인하는 함수
    const checkIfAlreadyLiked = async (memberNo, diaryNo) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/diary/checkIfAlreadyLiked", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo, diaryNo })
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
    const increaseLikes = async (sessionMemberNo, diaryNo) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/diary/detail/increaseLikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo: sessionMemberNo, diaryNo: diaryNo})
            });
            if (!response.ok) throw new Error('서버 응답 실패');
            const updatedDiaryDetail = await response.json();
            window.location.reload();
            console.log("증가 : "+updatedDiaryDetail);

        } catch (error) {
            console.error("추천 수를 증가시키는 중 에러 발생:", error);
        }
    };

    // 추천을 감소시키는 함수
    const decreaseLikes = async (sessionMemberNo, diaryNo) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/diary/detail/decreaseLikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo: sessionMemberNo, diaryNo: diaryNo})
            });
            if (!response.ok) throw new Error('서버 응답 실패');
            const updatedDiaryDetail = await response.json();
            window.location.reload()
            console.log("감소 : "+updatedDiaryDetail);
        } catch (error) {
            console.error("추천 수를 감소시키는 중 에러 발생:", error);
        }
    };
    const sanitizedHtml = DOMPurify.sanitize(diaryDetailVo.content);
    
    const navigate = useNavigate();

    return (
        <StyledDiaryDetailDiv>
            <div>{diaryDetailVo.title}</div>
            <div className='writeDate'>작성일 : {diaryDetailVo.enrollDate}</div>
            
            <div>작성자 : {diaryDetailVo.nick}</div>
            <div>추천수 : {diaryDetailVo.likesCount}</div>
            <div>조회수 : {diaryDetailVo.hit}</div>
            <div className='main' dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            {
            loginMemberVo && loginMemberVo.nick === diaryDetailVo.nick ? (
                <button id='like' disabled>추천</button>
                
            ) : (
                <button id='like' onClick={handleLikeButtonClick}>추천</button>
            )
             }
            <div></div>
            {/* 세션 스토리지의 id값과 boardDetailVo의 memberNo 비교 */}
            {sessionStorage.getItem("loginInfo") && loginMemberVo.nick === diaryDetailVo.nick ? (
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
                navigate("/diary/list");
            }}>목록으로</div>
        </StyledDiaryDetailDiv>
    );
    
};

export default DiaryDetail;