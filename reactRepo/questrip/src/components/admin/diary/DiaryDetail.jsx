import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledDiaryDetailDiv = styled.div`
    width: 80%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 7fr 1fr;
    border: solid 1px black;

    & > div{
        border: solid 1px black;
    }

    & > :nth-child(3){
        grid-column: span 2;
    }
    #deleteBtn{
        text-align: right;
        grid-column: span 2;
    }
`;

const DiaryDetail = () => {

    const location = useLocation();
    const vo = location.state.vo;
    const navigate = useNavigate();

    useEffect(()=>{
        
        
    }, [])

    const handleDeleteBtn = () => {
        
        fetch("http://127.0.0.1:8888/questrip/api/diary/admin/delete",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body : JSON.stringify(vo),
        })
        .then(resp => resp.json())
        navigate("/admin/diary/list");
    }

    return (
        <StyledDiaryDetailDiv>
             <div>제목 : {vo.title}</div>
            <div>
                작성일자 : {vo.enrollDate}<br/>
                작성자 : {vo.nick}
            </div>
            <div>내용 : {vo.content}</div>
            <div id='deleteBtn'><button onClick={handleDeleteBtn}>삭제하기</button></div>
        </StyledDiaryDetailDiv>
    );
};

export default DiaryDetail;