import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledJoinDiv = styled.div`

    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 8fr;
    place-items: center center;

    form{
        width: 100%;
        height: 100%;
    }

    #body{
        width: 80%;
    }

    & > form > div{
        width: 60%;
        height: 100%;
    }

    #body > div{
        margin-top: 20px;
        margin-left: 400px;

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

    & > form > div > div > #emailDiv{
        width: 100%;

        input{
            width: 21%;
        }
    }
`;


const MemberJoin = () => {

    const [idInput, setIdInput] = useState('');
    const [MemberVo, setMemberVo] = useState({});

    useEffect(()=>{
        
        
        
    }, [MemberVo]);
    

    const handleClickJoin = () => {

    }

    const  aa = () => {
        fetch("http://127.0.0.1:8888/questrip/api/member/join/dupCheck", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(MemberVo),
            })
            .then(resp => resp.json())
            .then(data => {

                if (data.msg ==="dup" && MemberVo.id != null) {
                    alert("이미 사용 중인 아이디입니다.");
                    
                } else {
                   alert("사용 가능한 아이디입니다.");
                }
                if( data.msg ==="dup" && MemberVo.nick != null){
                    alert("이미 사용중인 닉네임입니다.");
                    
                }
            })
    };

    const handleClickIdDupCheck = () => {
        const userId = document.getElementById("userIdInput").value;
        
        const regex = /^[a-zA-Z0-9]{6,20}$/;
        if(userId === ''){
            alert("아이디를 입력하세요.")
        }
        if(!regex.test(userId)){
            alert("아이디는 영문자와 숫자로 6~20자만 가능합니다.");
        }
        else{
            setMemberVo({

                id :  userId,
            })
             
        }
        console.log(MemberVo);
    }

    const handleClickNickDupCheck = () => {
        const userNick = document.getElementById("userNickInput").value;
        const regex = /^[a-zA-Z0-9]{6,20}$/;
        if(userNick === ''){
            alert("닉네임을 입력하세요.")
        }
        if(!regex.test(userNick)){
            alert("닉네임은 영문자와 숫자로 6~20자만 가능합니다.");
        }
        else{
            setMemberVo({

                nick :  userNick,
            })
        }
        console.log(MemberVo);
    }


    



    return (
        <StyledJoinDiv>
            <div id='head'>
                <h1>회원가입</h1>
            </div>
            <form onSubmit={handleClickJoin}>
                <div id='body'>
                    <div>
                        <b>아이디</b>
                        <div>
                            <input type="text" id='userIdInput' name='id' placeholder='아이디 입력(6~20자)'/>
                            <button type='button' onClick={handleClickIdDupCheck}>중복확인</button>
                        </div>
                    </div>
                    <div>
                        <b>비밀번호</b>
                        <div>
                            <input type="text" placeholder='비밀번호 입력(문자, 숫자 포함 8~20자)'/>
                        </div>
                    </div>
                    <div>
                        <b>비밀번호 확인</b>
                            <div>
                                <input type="text" placeholder='비밀번호 확인'/>
                            </div>
                        </div>
                    <div>
                        <b>닉네임</b>
                        <div>
                            <input type="text" id='userNickInput' name='nick' placeholder='닉네임 입력(문자, 숫자 포함 8~20자)'/>
                            <button type='button' onClick={handleClickNickDupCheck}>중복확인</button>
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
                            <button id='emailAuth' type='button'>인증하기</button>
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder='인증번호'/>
                        <button type='button'>입력</button>
                    </div>
                    <div id='joinButton'>
                        <button>회원가입</button>                    
                    </div>
                </div>
            </form>
            
        </StyledJoinDiv>
    );
};

export default MemberJoin;