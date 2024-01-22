import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginMemory } from './community/context/LoginContext';

const StyledHeaderDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 4fr 2fr;
    grid-template-rows: 1fr;
    
    & > .logoArea {
        background-image: url('/resources/img/QuesTrip.png');
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center center;
    }
    & > div{
        width: 100%;
    }

    table{
        width: 100%;
        display: grid;
        place-items: center center;

        & > tr{
            width: 100%;

            & > td{
                width: 100%;
            }
        }
    }

    .profile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    }

    .profile-grid div {
        padding: 1px;
        border: 1px solid #ccc;
        text-align: center;
        cursor: pointer;
    }

    .icon {
        grid-row: span 3;
    }

    .title {
    }

    .logout {
    }
`;

const StyledSearchDiv = styled.div`
    width: 100%;
    height: 100%;
    

    & > form{
        width: 100%;
        height: 100%;
        margin: 20px;
        & > select{
            height: 30%;
        
        }
        & :nth-child(2) {
            width: 30%;
            height: 30%;
        }
    }
`;



const Header = () => {
    let loginNumber ='';
    if(sessionStorage.getItem('loginInfo')){
        loginNumber = sessionStorage.getItem('loginInfo');
    }
    const {loginMemberVo, setLoginInfo} = useLoginMemory();
    
    const navigate = useNavigate();
    useEffect( ()=>{
        setLoginInfo({no : loginNumber});
    }, [] )

    return (
        <StyledHeaderDiv>
            <div className='logoArea' onClick={() => { navigate("/") }}></div>
            <StyledSearchDiv>
                <form action="">
                    <select name="search">
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="writer">작성자</option>
                    </select>
                    <input type="text" name='searchContent' id='searchInput' />
                    <input type="submit" value="검색" />
                </form>
            </StyledSearchDiv>
            
            {
                sessionStorage.getItem('loginInfo') // 세션 스토리지에 "MemberVo" 값이 있는지 확인
                    ?
                    <div>
                        <div class="profile-grid">
                            <div class="icon">
                                <img src={loginMemberVo.imgPath} alt="아이콘" />
                            </div>
                            <div class="title">{loginMemberVo.memberTitle}</div>
                            <div class="nickname">{loginMemberVo.nick}</div>
                            <div class="point">포인트 : {loginMemberVo.point}</div>
                            <div class="my-page" onClick={()=>{
                                navigate("/myPage");
                            }}>마이페이지</div>
                            <div class="logout" onClick={() => {
                            sessionStorage.removeItem('loginInfo');  // 세션 스토리지의 "MemberVo" 값 제거
                            alert("로그아웃 되었습니다.");
                            navigate("/");
                        }}>로그아웃</div>
                        </div>

                    </div>  
                    :
                    <div onClick={() => {
                        navigate("member/login");
                    }}>로그인</div>
            }
        </StyledHeaderDiv>
    );
};

export default Header;