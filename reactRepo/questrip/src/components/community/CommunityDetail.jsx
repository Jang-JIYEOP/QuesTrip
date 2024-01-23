import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginMemory } from './context/LoginContext';
import DOMPurify from 'dompurify';
import CommtListItem from '../commt/commtListItem';
import Page from '../page/Page';

const StyledCommunityDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 5fr 2fr 2fr ;
    grid-template-rows: 1fr 1fr 20fr 1fr 20fr 1fr 1fr ;
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

    #reply{
        grid-column: span 3;
        
    }
`;


const CommunityDetail = () => {
    const loginNumber = sessionStorage.getItem('loginInfo');
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();
    const  {id} = useParams(); // URL에서 게시글의 ID를 가져옵니다.
    const [pageTotal, setPageTotal] = useState([]);
    const [content, setContent] = useState({});
    const [boardDetailVo, setBoardDetailVo] = useState([]); // 상세 정보를 저장할 상태 변수입니다.
    const [commentList, setCommtList] = useState([]);
    const [boardVo, setBoardVo] = useState({
        no: id
    });
    const [searchInfoVo , setSearchInfoVo] = useState({

        pageNo : 1,
        limit : 5,
        boardNo : id,
    }
    );
    

    useEffect(() => {
        if(loginNumber !== null){
            setLoginInfo({no : loginNumber});
        }
        
        // API를 호출하여 게시글의 상세 정보를 가져옵니다.
        fetch(`http://127.0.0.1:8888/questrip/api/community/detail`, {
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

    const loadCommentVoList =() =>{
        fetch(`http://127.0.0.1:8888/questrip/api/comment/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(searchInfoVo)
        })
        .then(resp => resp.json())
        .then(commentList => {
            // 서버로부터 받은 데이터를 commentList 상태 변수에 저장합니다.
            setCommtList(commentList.voList);
            setPageTotal(commentList.pageTotal);
        })
        
        .catch(error => {
            console.error("댓글 목록을 가져오는 중 에러 발생:", error);
        });
    }

    //게시글 삭제
    const handleDeleteButton = () => {
        
        fetch("http://127.0.0.1:8888/questrip/api/community/detail/delete", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, 
            body: JSON.stringify({ no: boardDetailVo.no })
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
            const boardNo = boardDetailVo.no;
            const alreadyLiked = await checkIfAlreadyLiked(memberNo, boardNo);
            console.log("클라이언트에서 넘기는 값: "+ memberNo, boardNo);
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
            window.location.reload();
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
            window.location.reload();
            console.log("감소 : "+updatedBoardDetail);
        } catch (error) {
            console.error("추천 수를 감소시키는 중 에러 발생:", error);
        }
    };
    const sanitizedHtml = DOMPurify.sanitize(boardDetailVo.content);
    
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
            }));
        };

    const handleSubmit = () => {
        let content = document.getElementById("contentInput").value;
        
        fetch("http://127.0.0.1:8888/questrip/api/comment/write", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                boardNo: id,
                memberNo: loginNumber,
                content: content,
            }),
        })
        .then(resp => resp.json())
        console.log("멤버 넘버: ", commentList.memberNo);
        console.log("게시글 넘버: ", commentList.boardNo);
        console.log("내용: ", commentList.content);
        window.location.reload();
    }

    useEffect( () => {
        loadCommentVoList();
        
    }, [searchInfoVo] );


    return (
        <StyledCommunityDetailDiv>
            <div>{boardDetailVo.title}</div>
            <div className='writeDate'>작성일 : {boardDetailVo.enrollDate}</div>
            
            <div>작성자 : {boardDetailVo.nick}</div>
            <div>추천수 : {boardDetailVo.likesCount}</div>
            <div>조회수 : {boardDetailVo.hit}</div>
            <div className='main' dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            
            {
            loginMemberVo && loginMemberVo.nick === boardDetailVo.nick ? (
                <button id='like' disabled>추천</button>
                
            ) : (
                <button id='like' onClick={handleLikeButtonClick}>추천</button>
            )
             }

            <div id='reply'>
                {commentList.map( (vo) => {
                    return <CommtListItem key = {vo.no} vo = {vo}/>
                })
            }
                <div>
                    <input type="text" id='contentInput'/> 
                    <button onClick={handleSubmit}>작성</button>
                </div>
                <div id='pageArea'>
                    <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
                </div>
            </div>
            
            {sessionStorage.getItem("loginInfo") && loginMemberVo.nick === boardDetailVo.nick ? (
            <>  <div></div>
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