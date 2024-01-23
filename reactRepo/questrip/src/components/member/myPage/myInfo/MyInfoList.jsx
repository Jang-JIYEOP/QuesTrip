import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginMemory } from '../../../community/context/LoginContext';

const StyledMyInfoListDiv = styled.div`
    #body{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        margin-left: 60px;
        gap: 20px;
    }
`;

const MyInfoList = () => {

    const loginNumber = sessionStorage.getItem('loginInfo');
    const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();
    const [MemberVo, setMemberVo] = useState({});
    const [pwdMsg, setPwdMsg] = useState('');
    const [idDupCheck, setidDupCheck] = useState(0);
    const [nickDupCheck, setNickDupCheck] = useState(0);
    const [emailCode, setEmailCode] = useState('');
    const [emailAuth, setEmailAuth] = useState(0);
    const [selectedEmailOption, setSelectedEmailOption] = useState('directInput');
    const [isVerificationCodeVisible, setVerificationCodeVisible] = useState(false);
    const [emailPrefix, emailSuffix] = loginMemberVo.email.split('@');

    useEffect( ()=>{
        setLoginInfo({no : loginNumber});
        console.log(loginMemberVo.email);
    }, []);
    

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

    useEffect(()=>{
        if(MemberVo.email){
            fetch('http://127.0.0.1:8888/questrip/api/member/join/emailCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(MemberVo),
            })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.verificationCode) {

                    alert('이메일 인증 코드를 전송했습니다. 확인해주세요.');

                    setMemberVo(prevMemberVo => ({
                        ...prevMemberVo,
                        emailCode : data.verificationCode,
                    }));

                } else {
                    alert('이메일 인증 코드 전송에 실패했습니다.');
                    setEmailAuth(0);
                }
            })
            .catch((error) => {
                console.error('Error sending email verification code:', error);
            });
        }
    }, [MemberVo.email], [MemberVo.emailCode]);


    const handleEmailAuth= ()=> {
        if(MemberVo.emailPrefix !== ''){
            const fullEmail = `${emailPrefix}@${emailSuffix}`;
            setMemberVo(prevMemberVo => ({
                ...prevMemberVo,
                email : fullEmail,
        }));
        setVerificationCodeVisible(true);
        }else{
            alert("이메일 주소를 입력해주세요.");
        }
        

        
    };

  const handleVerifyEmail = () => {
        // 이메일 인증 코드 검증
        const userAuthCodeInput = document.getElementById("userAuthCodeInput").value;
        if (MemberVo.emailCode === userAuthCodeInput) {
            alert('이메일이 성공적으로 인증되었습니다.');
            setEmailAuth(prevEmailAuth => prevEmailAuth + 1);
        } else {
            alert('이메일 인증에 실패했습니다. 다시 시도해주세요.');
            setEmailAuth(0);
        }
    };

    const pwdCheck = () =>{
        const pwd = document.getElementById("userPwdInput").value;
        const pwd2 = document.getElementById("userPwdCheckInput").value;
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
    }

    const handleClickJoin = () => {
        if(nickDupCheck !== 0 && MemberVo.pwd !== null && emailAuth !== 0){
            
            alert("회원정보가 수정되었습니다.")
            
            fetch("http://127.0.0.1:8888/questrip/api/member/edit", {
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
        if(nickDupCheck === 0 || emailAuth === 0){
            alert("닉네임 중복 여부, 이메일 인증을 확인해주세요.");
        }
        
    }

    const handleClickNickDupCheck = () => {
        let userNick = document.getElementById("userNickInput").value;
        const regex = /^[a-zA-Z0-9]{6,20}$/;

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
        }
    }

    


    return (
        <StyledMyInfoListDiv>
            <form onSubmit={handleClickJoin}>
                <div id='body'>
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
                            <input type="text" placeholder='이메일 주소' value={emailPrefix} disabled/>
                            <b> @ </b>
                            <input type="text" value={emailSuffix} disabled />

                            
                            <button id='emailAuth' type='button' onClick={handleEmailAuth}>인증하기</button>
                        </div>
                    </div>
                    {isVerificationCodeVisible && (
                    <div>
                        <input type="text" id="userAuthCodeInput" placeholder='인증번호'/>
                        <button id='emailAuthCode' type='button' onClick={handleVerifyEmail}>입력</button>
                    </div>
                    )}
                    <div>
                        <b>비밀번호</b>
                        <div>
                            <input type="password" id='userPwdInput' placeholder='비밀번호 입력(8자 ~ 16자, 영문, 특수 문자 사용)' onChange={pwdCheck}/>
                        </div>
                    </div>
                    <div>
                        <b>비밀번호 확인</b>
                            <div>
                                <input type="password" id='userPwdCheckInput' placeholder='비밀번호 확인' onChange={pwdCheck}/>
                                <div>{pwdMsg}</div>
                            </div>
                        </div>
                    
                    
                    <div id='joinButton'>
                        <button>회원정보 수정</button>                    
                    </div>
                </div>
            </form>
        </StyledMyInfoListDiv>
    );
};

export default MyInfoList;