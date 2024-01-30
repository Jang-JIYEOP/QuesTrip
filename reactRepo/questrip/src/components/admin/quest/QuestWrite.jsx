import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressInput from './AddressInput';

const StyledWriteDiv = styled.div`
    width: 60%;
    height: 100%;

    padding-right: 20%;
    #submit{
        text-align: right;
    }
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
            align-items: center;
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
            width: 100%;
            grid-column: span 2;
        }

        #content {
            grid-column: span 3;
        }
    }
`;

const QuestWrite = () => {
    const [locateCategoryVoList, setLocateCategoryVoList] = useState([]);
    const [questCategoryVoList, setQuestCategoryVoList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
  

    const loadLocateCategoryVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/locatecategory/list")
        .then(resp => resp.json())
        .then(data => {
            setLocateCategoryVoList(data);
        });
      }
    
      const loadQuestCategoryVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/questcategory/list")
        .then(resp => resp.json())
        .then(data => {
            setQuestCategoryVoList(data);
        });
      }
    const [coordinates, setCoordinates] = useState({
        lat : '',
        lng : '',
    });
    const [fileObj,setFileObj] = useState();

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setFileObj(e.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
    };

    // 좌표값을 받아오는 함수
    const handleCoordinatesChange = (newCoordinates) => {
        setCoordinates(newCoordinates);
    };

    useEffect(() => {
        loadLocateCategoryVoList();
        loadQuestCategoryVoList();
    },[])

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
                    <select name="queCateNo">
                    <option value=''>분류</option>
                    {questCategoryVoList.map((qcvl) => 
                    <option key={qcvl.no} value={qcvl.no}>{qcvl.name}</option>
                    )}
                </select>
                </div>
                <div id="point">
                <select name="point">
                  <option value=''>포인트</option>
                  {Array.from({length: 10}, (_, i) => (i + 1) * 50).map((num) => 
                    <option key={num} value={num}>{num}</option>
                  )}
                </select>
                </div>
                <div id="headCnt">
                        <select name="headCnt">
                        <option value=''>인원수</option>
                        {Array.from({length: 10}, (_, i) => i + 1).map((num) => 
                            <option key={num} value={num}>{num}명</option>
                        )}
                        </select>
                </div>
                <div id="locCateNo">
                    <select name="locCateNo">
                    {locateCategoryVoList.map((lcvl) => 
                        <option key={lcvl.no} value={lcvl.no}>{lcvl.name}</option>
                    )}
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
                <br/>
                <div id="img">
                    {selectedImage ? (
                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
                    ) : (
                        ''
                        )}
                </div>
                <div id="submit">
                    <input type="submit" value="등록하기" />
                </div>
            </form>
        </StyledWriteDiv>
    );
};

export default QuestWrite;
