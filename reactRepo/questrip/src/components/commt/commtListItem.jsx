import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginMemory } from '../community/context/LoginContext';
import underCommtListItem from './underCommtListItem';
import UnderCommtListItem from './underCommtListItem';

const StlyedCommtListItemDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    
    margin-top: 10px;
    #img{
        grid-row: span 2;
    }
    img{
        width: 100%;
        height: 100%;
    }
    #nick{
        grid-column: span 2;
        font-size: 13px;
        
    }
    #content{
        text-align: left;
        margin-left: 10px;
        grid-column: span 3;
        border-bottom: 1px solid lightgray;
        font-size: 18px;
    }
    #divv{
        display: grid;
        grid-template-columns: 0.5fr 1fr 3fr 0.6fr 0.5fr;
        width: 100%;
        gap: 10px;
        text-align: left;
    }
    #delete{
        text-align: right;
        margin-right: 10px;
    }
    #likesCount{
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
    }
    #count{
        width: 50%;
    }
`;


const CommtListItem = ({vo}) => {

    const loginNumber = sessionStorage.getItem('loginInfo');
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();
    const [underCommentList, setUnderCommentList] = useState([]);
    const [commentVo, setCommentVo] = useState([]);

    useEffect( ()=>{
        if(loginNumber !== null){
            setLoginInfo({no : loginNumber});
        }  
    },[])

    //게시글 삭제
    const handleDelete = () => {
        
        fetch("http://127.0.0.1:8888/questrip/api/comment/delete", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, 
            body: JSON.stringify({ no: vo.no })
        }).then(resp => resp.json())
        .then(
            window.location.reload()
        )
    }

    // 게시글 추천 버튼 클릭 시 동작하는 함수 예시
    const handleLikeButtonClick = async () => {
        const sessionData = sessionStorage.getItem('loginInfo');
        if (sessionData == null){
            alert("로그인 후 이용해주세요");
            window.location.reload();
        }else{
            const memberNo = vo.memberNo;
            const no = vo.no;
            const alreadyLiked = await checkIfAlreadyLiked(memberNo, no);
            console.log("클라이언트에서 넘기는 값: "+ memberNo, no);
            if (alreadyLiked) {
                console.log('이미 추천한 게시글입니다.');
                // 이미 추천한 게시글에 대한 처리 (예: decreaseLikes 함수 호출)
                decreaseLikes(memberNo, no);  // 해당 함수를 호출하면 추천 취소 기능을 수행할 수 있습니다.
            } 
            else {
                console.log('아직 추천하지 않은 게시글입니다.');
                // 추천 버튼 활성화 또는 추천 로직 구현
                increaseLikes(memberNo, no);  // 해당 함수를 호출하면 추천 기능을 수행할 수 있습니다.
            }
        }
    };

    // 이미 추천한 게시글인지 확인하는 함수
    const checkIfAlreadyLiked = async (memberNo, no) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/comment/checkIfAlreadyLiked", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo, no })
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
    const increaseLikes = async (sessionMemberNo, no) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/comment/increaseLikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo: sessionMemberNo, no: no})
            });
            if (!response.ok) throw new Error('서버 응답 실패');
            const updatedComment = await response.json();
            window.location.reload();
            console.log("증가 : "+updatedComment);

        } catch (error) {
            console.error("추천 수를 증가시키는 중 에러 발생:", error);
        }
    };

    // 추천을 감소시키는 함수
    const decreaseLikes = async (sessionMemberNo, no) => {
        try {
            const response = await fetch("http://127.0.0.1:8888/questrip/api/comment/decreaseLikes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberNo: sessionMemberNo, no: no})
            });
            if (!response.ok) throw new Error('서버 응답 실패');
            const updatedComment = await response.json();
            window.location.reload();
            console.log("감소 : "+updatedComment);
        } catch (error) {
            console.error("추천 수를 감소시키는 중 에러 발생:", error);
        }
    };

    useEffect( ()=>{
        loadUnderCommentVoList();
    }, [commentVo])

    //대댓글 조회
    const loadUnderCommentVoList =() =>{
        console.log("댓글번호",vo.no);
        setCommentVo({
            parentNo : vo.no
        })

        fetch(`http://127.0.0.1:8888/questrip/api/comment/underCommentList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentVo) 
        })
        .then(resp => resp.json())
        .then(underCommentList => {
            // 서버로부터 받은 데이터를 commentList 상태 변수에 저장합니다.
            setUnderCommentList(underCommentList.voList);
            console.log("??",underCommentList.voList);
        })
        
        .catch(error => {
            console.error("댓글 목록을 가져오는 중 에러 발생:", error);
        });
        
    }        


    
    return (
        <StlyedCommtListItemDiv>
            <div id='divv'>
                <div id='img'><img src={vo.icon} alt="이미지" /></div>
                <div>{vo.memberTitle}</div>
                <div>{vo.enrollDate}</div>
                {
                    loginMemberVo && loginMemberVo.nick === vo.nick ? (

                        <div id='likesCount' onClick={handleLikeButtonClick}>추천 : <div id='count'>{vo.likesCount}</div> </div>
                    ) : (
                        <div id='likesCount' onClick={handleLikeButtonClick}>추천 : <div id='count'>{vo.likesCount}</div></div>
                    )
                }
                {
                    sessionStorage.getItem("loginInfo") && loginMemberVo.nick === vo.nick ? (

                        <div id='delete' onClick={handleDelete}>삭제</div>
                    ) : (
                        <div></div>
                    )
                }
                <div id='nick'>{vo.nick}</div>
            </div>
            <div id='content'>{vo.content}</div>
            <UnderCommtListItem voList = {underCommentList}/> 

        </StlyedCommtListItemDiv>
    );
};

export default CommtListItem;