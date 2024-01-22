import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const StyledLoginDiv = styled.div`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start; /* 상단 정렬로 변경 */

        & > form {
            width: 300px;
            display: flex;
            flex-direction: column;
            text-align: center;
            margin-top: 200px; /* 원하는 높이만큼 상단에 여백 추가 */
        }

        .loginArea {
            margin-bottom: 15px;
        }

        input {
            margin-bottom: 10px;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }

        #loginButton {
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        #loginButton:hover {
            background-color: #2980b9;
        }

        #loginTitle {
            font-size: 40px;
            margin-bottom: 100px;
        }
        #id{
        text-align: left; /* 왼쪽 정렬로 변경 */
        }
        #pwd{
            text-align: left; /* 왼쪽 정렬로 변경 */
        }
    `;

const AdminLogin = () => {
    
 const [adminVo, setAdminVo] = useState([]);

const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.elements.id.value;
    const pwd = e.target.elements.pwd.value;

    setAdminVo(() => ({
        id,
        pwd,
    }));
};
const navigate = useNavigate();
const loadLoginAdmin = () => {   
        fetch("http://127.0.0.1:8888/questrip/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(adminVo),
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data.msg);
            if(data.msg === "good"){
                navigate("/admin/member/list");
            }else{
                alert("로그인 실패 ...");
            }
        });
    
    
}


useEffect(() => {
    console.log("밖",adminVo);
    if (adminVo.id && adminVo.pwd) {
        console.log("이프문");
        console.log('adminVo:', adminVo);
        loadLoginAdmin();
    }
    else{
        console.log("엘스문");
    }
},[adminVo])
    return (
        <StyledLoginDiv>
            <form onSubmit={handleSubmit}>
                <div id="loginTitle">로그인</div>
                <div className='loginArea'>
                    <div id="id">ID</div>
                    <input
                        type="text"
                        name='id'
                        placeholder='아이디를 입력하세요'
                        value={adminVo.id}
                    />
                    <div id="pwd">PWD</div>
                    <input
                        type="password"
                        name='pwd'
                        placeholder='비밀번호를 입력하세요'
                        value={adminVo.pwd}
                    />
                </div>
                <input id='loginButton' type='submit' value="로그인"/>
            </form>
        </StyledLoginDiv>
    );
};


export default AdminLogin;