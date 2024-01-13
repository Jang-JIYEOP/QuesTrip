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


    const [MemberVo, setMemberVo] = useState({});
    const [pwdMsg, setPwdMsg] = useState('');
    const [idDupCheck, setidDupCheck] = useState(0);
    const [nickDupCheck, setNickDupCheck] = useState(0);

    useEffect(()=>{
        if(MemberVo.id){
            fetch("http://127.0.0.1:8888/questrip/api/member/join/dupCheck", {
                            method: "POST",
                            headers: {
                                "Content-Type" : "application/json",
                            },
                            body: JSON.stringify(MemberVo),
                        })
                        .then(resp => resp.json())
                        .then(data => {
                            if(data.msg ==="good"){
                                alert("사용가능한 아이디입니다.");
                                setidDupCheck(prevIdDupCheck => prevIdDupCheck + 1);
                            }
                            else{
                                alert("중복된 아이디입니다.");
                                setidDupCheck(0);
                                document.getElementById("userIdInput").value = '';
                            }
                        });
        }
        
        
    }, [MemberVo.id]);
    
    useEffect( () => {
        if(MemberVo.nick){
            fetch("http://127.0.0.1:8888/questrip/api/member/join/dupCheck", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json",
                        },
                        body: JSON.stringify(MemberVo),
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        if(data.msg === "good"){
                            alert("사용가능한 닉네임입니다.");
                            setNickDupCheck(prevNickDupCheck => prevNickDupCheck + 1);
                        }
                        else{
                            alert("중복된 닉네임입니다.");
                            setNickDupCheck(0);
                            document.getElementById("userNickInput").value = '';
                        }
                    })
        }
    }, [MemberVo.nick]);


    const handleClickJoin = () => {
        if(idDupCheck !== 0 && nickDupCheck !== 0 && MemberVo.pwd !== null){
            
            console.log(JSON.stringify(MemberVo));
            alert("회원가입을 축하합니다.")
            
            fetch("http://127.0.0.1:8888/questrip/api/member/join", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(MemberVo),
                })
                .then(resp => resp.json())
                .then(data => {
                    
                   
                })
        }
        if(idDupCheck === 0 || nickDupCheck === 0){
            alert("아이디 또는 닉네임 중복 여부를 확인해주세요.");
        }
        
    }



    const handleClickIdDupCheck = () => {
        let userId = document.getElementById("userIdInput").value;

        console.log("id dupCheck",idDupCheck);
        
        
        const regex = /^[a-zA-Z0-9]{6,20}$/;
        if(userId === ''){
            alert("아이디를 입력하세요.");
            setidDupCheck(0);
        }
        else if(!regex.test(userId) && userId !== ''){
            alert("아이디는 영문자와 숫자로 6~20자만 가능합니다.");
            userId ='';
            document.getElementById("userIdInput").value = userId;  // userId를 비워주고 엘리멘트에 반영
            setidDupCheck(0);
        }
        else{
            setMemberVo(prevMemberVo => ({
                ...prevMemberVo,
                id: userId,
            }));
            console.log(MemberVo);
            
                    
        }
    }

    const handleClickNickDupCheck = () => {
        let userNick = document.getElementById("userNickInput").value;
        const regex = /^[a-zA-Z0-9]{6,20}$/;

        

        console.log("nick dupCheck",nickDupCheck);
        if(userNick === ''){
            alert("닉네임을 입력하세요.")
            setNickDupCheck(0);
        }
        else if(!regex.test(userNick) && userNick !== ''){
            alert("닉네임은 영문자와 숫자로 6~20자만 가능합니다.");
            userNick = '';
            document.getElementById("userNickInput").value = userNick;  // userNick을 비워주고 엘리멘트에 반영
            setNickDupCheck(0);
        }
        else{
            setMemberVo(prevMemberVo => ({
                ...prevMemberVo,
                nick: userNick,
            }));
            
                    console.log(MemberVo);
        }
    }

    const pwdCheck = () =>{
        const pwd = document.getElementById("userPwdInput").value;
        const pwd2 = document.getElementById("userPwdCheckInput").value;
        console.log("pwd",pwd);
        console.log("pwd2",pwd2);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

        if (regex.test(pwd)){
            if(pwd === pwd2){
                setPwdMsg('비밀번호가 일치합니다.');
                setMemberVo(prevMemberVo => ({
                    ...prevMemberVo,
                    pwd: pwd,
                }));
            }else{
                setPwdMsg('비밀번호가 일치하지 않습니다.');
            }
        }else{
            setPwdMsg('사용할 수 없는 비밀번호입니다.');
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
                            <input type="text" id='userPwdInput' placeholder='비밀번호 입력(8자 ~ 16자, 영문, 특수 문자 사용)' onChange={pwdCheck}/>
                        </div>
                    </div>
                    <div>
                        <b>비밀번호 확인</b>
                            <div>
                                <input type="text" id='userPwdCheckInput' placeholder='비밀번호 확인' onChange={pwdCheck}/>
                                <div>{pwdMsg}</div>
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