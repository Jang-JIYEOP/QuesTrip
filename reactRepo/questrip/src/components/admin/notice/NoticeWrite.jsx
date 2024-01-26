import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNoticeWriteDiv = styled.div`
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 9fr 1fr;
    gap: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;

    & > div {
        display: flex;
        align-items: center;
    }

    & > div > input,
    & > div > textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
        /* 높이를 조절하세요 */
        height: 90%; /* 예시 값, 필요에 따라 조절하세요 */
        resize: none; /* textarea의 크기 조절 비활성화 */
    }

    #writeBtn {
        display: flex;
        justify-content: flex-end;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const NoticeWrite = () => {

    const [noticeVo, setNoticeVo] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://127.0.0.1:8888/questrip/api/notice/write",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body : JSON.stringify(noticeVo),
        })
        .then(resp => resp.json())
        .then(data=>{
            navigate("../notice/list" );
        })
    }, [noticeVo])

    const handleWriteBtn = () => {
        
        const titleInput = document.getElementById("title").value;
        const contentInput = document.getElementById("content").value;

        setNoticeVo({
            title: titleInput,
            content: contentInput,
        })

        
    }


    return (
        <StyledNoticeWriteDiv>
            <div>
                <input type="text" id="title" placeholder="제목을 입력하세요" />
            </div>
            <div>
                <textarea id="content" placeholder="내용을 입력하세요"></textarea>
            </div>
            <div id="writeBtn">
                <button onClick={handleWriteBtn}>작성하기</button>
            </div>
        </StyledNoticeWriteDiv>
    );
};

export default NoticeWrite;
