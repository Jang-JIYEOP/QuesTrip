import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressInput from './AddressInput';

const StyledWriteDiv = styled.div`
    width: 60%;
    height: 100%;

    padding-right: 20%;
    & > form {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 4fr 1fr;
        place-items: center center;

        & > div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;

            select,
            input,
            textarea,
            [type='file'] {
                width: 80%;
                padding: 8px;
                margin: 5px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }

            textarea {
                height: 80%
            }
        }

        #queCate,
        #point,
        #headCnt,
        #locCate {
            select {
                width: 90%;
            }
        }

        #upload {
            grid-column: span 2;
            input[type='file'] {
                width: 100%;
            }
        }

        #title {
            grid-column: span 3;
        }
        #adress {
            grid-column: span 2;
        }

        #content {
            grid-column: span 3;
        }
    }
`;

const QuestWrite = () => {
    const [coordinates, setCoordinates] = useState({
        lat : '',
        lng : '',
    });
    const [fileObj,setFileObj] = useState();

    const handleChangeFile = (e) => {
        setFileObj(e.target.files[0]);
    };

    // 좌표값을 받아오는 함수
    const handleCoordinatesChange = (newCoordinates) => {
        setCoordinates(newCoordinates);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();

         
        const locCateNo = event.target.locCateNo.value;
        const point = event.target.point.value;
        const queCateNo = event.target.queCateNo.value;
        const headCnt = event.target.headCnt.value;
        const title = event.target.title.value;
        const content = event.target.content.value;
        const latitude = coordinates.lat;
        const longitude = coordinates.lng;

        const fd = new FormData();
        fd.append("file", fileObj);
        fd.append("title" , title);
        fd.append("locCateNo" , locCateNo);
        fd.append("queCateNo" , queCateNo);
        fd.append("point" , point);
        fd.append("headCnt" , headCnt);
        fd.append("latitude" , latitude);
        fd.append("longitude" , longitude);
        fd.append("content" , content);


        console.log(fd);
        fetch("http://127.0.0.1:8888/questrip/api/quest/write" , {
            method: "POST",
            body : fd ,
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "good"){
                alert("퀘스트 작성 완료 !");
            }else{
                alert("퀘스트 작성 실패 ...");
            }
        } )
        ;
    }
    
    return (
        <StyledWriteDiv>
            <form onSubmit={handleSubmit}>
                <div id="queCate">
                    <select name = 'queCateNo'>
                        <option value="1">옵션 1</option>
                        <option value="2">옵션 2</option>
                    </select>
                </div>
                <div id="point">
                    <select name='point'>
                        <option value="1">포인트 1</option>
                        <option value="2">포인트 2</option>
                    </select>
                </div>
                <div id="headCnt">
                    <select name='headCnt'>
                        <option value="1">헤드 1</option>
                        <option value="2">헤드 2</option>
                    </select>
                </div>
                <div id="locCateNo">
                    <select name='locCateNo'>
                        <option value="1">지역 1</option>
                        <option value="2">지역 2</option>
                    </select>
                </div>
                <div id="adress">
                    <AddressInput onCoordinatesChange={handleCoordinatesChange} />
                </div>
                <div id="title">
                    <input type="text"  name='title' placeholder="제목" />
                </div>
                <div id="content">
                    <textarea name='content' placeholder="내용"></textarea>
                </div>
                <div id="upload">
                    <input type="file" multiple name='f' onChange={handleChangeFile}/>
                </div>
                <div>
                    <input type="submit" value="등록하기" />
                </div>
            </form>
        </StyledWriteDiv>
    );
};

export default QuestWrite;
