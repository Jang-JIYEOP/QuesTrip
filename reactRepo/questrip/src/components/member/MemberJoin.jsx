import React from 'react';
import styled from 'styled-components';

const StyledJoinDiv = styled.div`

    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 8fr;
    place-items: center center;


    & > div{
        width: 80%;
        height: 100%;
    }

    #body > div{
        margin-top: 20px;
        margin-left: 200px;

        button{
            margin-left: 10px;
        }

        select{
            margin-left: 12px;
        }
    }

    #joinButton{
        display: grid;
        place-items: center;
        margin-right: 200px;
    }

    & > #head{
        display: grid;
        place-items: center;
    }

    input{
        width: 60%;
        height: 100%;
    }

    & > div > div > #emailDiv{
        width: 100%;

        input{
            width: 21%;
        }
    }
`;


const MemberJoin = () => {
    return (
        <StyledJoinDiv>
            <div id='head'>
                <h1>회원가입</h1>
            </div>
            <div id='body'>
                <div>
                    <b>아이디</b>
                    <div>
                        <input type="text" placeholder='아이디 입력(6~20자)'/>
                        <button>중복확인</button>
                    </div>
                </div>
                <div>
                    <b>비밀번호</b>
                    <div>
                        <input type="text" placeholder='비밀번호 입력(문자, 숫자 포함 8~20자)'/>
                    </div>
                </div>
                <div>
                    <b>닉네임</b>
                    <div>
                        <input type="text" placeholder='닉네임 입력(문자, 숫자 포함 8~20자)'/>
                    </div>
                </div>
                <div>
                    <b>이메일 주소</b>
                    <div id='emailDiv'>
                        <input type="text" placeholder='이메일 주소'/>
                        <b> @ </b>
                        <input type="text" />
                        <select name="email" id="">
                            <option value="">직접 입력</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                        </select>
                        <button id='emailAuth'>인증하기</button>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder='인증번호'/>
                    <button>입력</button>
                </div>
                <div id='joinButton'>
                    <button>회원가입</button>                    
                </div>
            </div>
        </StyledJoinDiv>
    );
};

export default MemberJoin;