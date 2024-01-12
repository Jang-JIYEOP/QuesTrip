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
        if(MemberVo.id != null){
            aa();
        }
        
    }, [MemberVo]);
    

    const handleInputChange = (e) => {
        setIdInput(e.target.value); // 입력값을 상태에 설정
    }

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

                if (data.msg ==="dup") {
                    alert("이미 사용 중인 아이디입니다.");
                } else {
                   alert("사용 가능한 아이디입니다.");
                }
            })
    };

    const handleClickDupCheck = () => {
        if(!idInput.trim()){
            alert("아이디를 입력하세요.")
        }else{
            setMemberVo({
                id : idInput
            })
        }
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
                            <input type="text" name='id' placeholder='아이디 입력(6~20자)' value={idInput} onChange={handleInputChange}/>
                            <button type='button' onClick={handleClickDupCheck}>중복확인</button>
                        </div>
                    </div>
                    <div>
                        <b>비밀번호</b>
                        <div>
                            <input type="text" placeholder='비밀번호 입력(문자, 숫자 포함 8~20자)' onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div>
                        <b>비밀번호 확인</b>
                            <div>
                                <input type="text" placeholder='비밀번호 확인' onChange={handleInputChange}/>
                            </div>
                        </div>
                    <div>
                        <b>닉네임</b>
                        <div>
                            <input type="text" placeholder='닉네임 입력(문자, 숫자 포함 8~20자)' onChange={handleInputChange}/>
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