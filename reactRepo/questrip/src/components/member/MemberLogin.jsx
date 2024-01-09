import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledLoginDiv = styled.div`
    & > form{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 2fr 2fr 4fr 2fr;
        place-items: center center;
        & > div{
        width: 100%;
        display: grid;
        place-items: center center;
        }
        
        & > .loginArea{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 1fr;
        place-items: center center;
        
        & > input {
            width: 80%;
            height: 80%;
            }
        }
    
    }
    

    button{
        width: 30%;
        height: 30%;
    }



`;

const MemberLogin = () => {

    const [vo , setVo] = useState();
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setVo({
            ...vo ,
            [name]: value
        });
    }
    
    console.log(vo);
    const jsonStr = sessionStorage.getItem("MemberVo");
    const sessionloginMemberVo = JSON.parse(jsonStr);
    const [MemberVo , setMemberVo] = useState(sessionloginMemberVo);

    const handleClickLogin = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8888/questrip/api/member/login" , {
            method: "POST" ,
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(vo) ,
        })
        .then( (resp) => { return resp.json() } )
        .then( (data) => { 
            if(data.msg === "good"){
                alert("로그인 성공 !");
                sessionStorage.setItem("MemberVo" , JSON.stringify(data.emberVo));
                setMemberVo(data.MemberVo);
                navigate("home");
            }else{
                alert("로그인 실패 ...");
            }
         } )
        .catch( (e) => {console.log(e)} )
        .finally( () => {console.log("로그인 fetch 끝 ~~~");} )
        ;

    }
    

    return (
        <StyledLoginDiv>
            <form onSubmit={handleClickLogin}>
                <div></div>
                <div className='loginArea'>
                    <input type="text" name='id' placeholder='아이디를 입력하세요' onChange={handleInputChange}/>
                </div>
                
                <div></div>
                <div></div>
                <div className='loginArea'>
                    <input type="password" name='pwd' placeholder='비밀번호를 입력하세요' onChange={handleInputChange}/>
                </div>
                <div></div>
                <div></div>
                <input type='submit' value="로그인"/>
                <div></div>
                <link rel="stylesheet" href="" /> 회원가입
                <div></div>
                <link rel="stylesheet" href="" />아이디/비밀번호 찾기
            </form>
            
        </StyledLoginDiv>
    );
};

export default MemberLogin;