import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginMemory } from '../community/context/LoginContext';


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

        #loginButton{
            width: 35%;
            height: 30%;
            background-color: #2f92e4;
            color: white;
            border-radius: 5%;
            border: none;
        }
    
    }

`;

const MemberLogin = () => {

    const  {setLoginInfo, loginMemberVo} = useLoginMemory();
    
    

    const navigate = useNavigate();
    

    const [vo , setVo] = useState({});

    
    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setVo({
            ...vo ,
            [name]: value
        });
    }

    const handleClickLogin = (event) => {
        event.preventDefault();

        setLoginInfo({
            id: vo.id,
            pwd: vo.pwd
        })

                              
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
                <input id='loginButton' type='submit' value="로그인"/>
                <div></div>
                <div onClick={()=>{
                    navigate("/member/join")
                }}>회원가입</div> 
                <div></div>
                <link rel="stylesheet" href="" />아이디/비밀번호 찾기
            </form>
            
        </StyledLoginDiv>
    );
};

export default MemberLogin;