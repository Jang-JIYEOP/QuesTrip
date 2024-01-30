import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MapContainer from '../map/MapContainer';
import { useQuestMemory } from '../community/context/QuestContext';
import Page from '../page/Page';
import { useNavigate } from 'react-router-dom';
import { useLoginMemory } from '../community/context/LoginContext';




const StyledHomeDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 1fr;
    place-items: center center;
    & > div{
        width: 100%;
        height: 100%;
        border: 1px solid black;

        & > table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 8px; /* 모서리 둥글게 */

        &  tr {
            height: 40px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
            transition: background-color 0.3s ease; /* 부드러운 전환 효과 */

            &:hover {
                background-color: #87CEEB; /* 하늘색 */
            }
        }

        & > thead > tr > th {
            padding: 10px;
            background-color: #4682B4; /* 더 진한 파란색 */
            color: white;
            text-align: left;
        }

        & > tbody > .bestThree {
            background-color: #d3d3d3; /* 연한 회색 */
        }

        & > tbody > tr > td {
            padding: 10px;
        }
    }
    }

    
    
    & > div:nth-child(2){
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr;
        & > :nth-child(1){
            width: 100%;
            height: 100%;
            & > form{
                padding: 10px ;
                & > select {
                    width: 60%;
                }
            }
            &>div{
                width: 100%;
                height: 80%;
            }
        }
        & > :nth-child(2){
            width: 100%;
            height: 100%;
        }

        #questList {
            height: 310px;
        }
        & #questList > div{
            width: 100%;
            display: grid;
            grid-template-columns: 2.7fr 1.3fr;
            grid-template-rows: 1fr;
            margin-top: 10px;
        }
        #questHead{
            height: 15px;
            margin-left: 20px;
        }

        #page{
            height: 35px;
        }
    }
    
   
`;

const Home = () => {

    const {questVoList, searchInfoVo, setSearchInfoVo, pageTotal, handlePageChange} = useQuestMemory();
    const [locateCategoryVoList, setLocateCategoryVoList] = useState([]);
    const loginNumber = sessionStorage.getItem('loginInfo');
    const {setLoginInfo} = useLoginMemory();
    const [selectedQuest, setSelectedQuest] = useState(null);
    const mapContainerRef = useRef(null);
    const [boardBestList, setBoardBestList] = useState([]);
    const loadLocateCategoryVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/locatecategory/list")
        .then(resp => resp.json())
        .then(data => {
            setLocateCategoryVoList(data);
        });
      }
    const loadBoardVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/community/list", {
            method: "POST",
            headers: {
            "Content-Type": "application/json", 
            },
        body : JSON.stringify(searchInfoVo),
        })
        .then(resp => resp.json())
            .then(data => {
                setBoardBestList(data.bestList);
            });
    }

    useEffect(() => {
        if(loginNumber !== null){
            setLoginInfo({no : loginNumber});
        }

        setSearchInfoVo({
          locCateNo : 1,
          pageNo : 1,
          limit : 10,
        });
      },[]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedOptionValue = event.target.search.value;
        setSearchInfoVo({
            locCateNo : selectedOptionValue,
            pageNo : 1,
            limit : 10,
        });
      };
    const navigate = useNavigate();

    const handlePClick = (questVo) => {
        setSelectedQuest(questVo);
        if (mapContainerRef.current) {
          mapContainerRef.current.onMarkerClick(questVo);
        }
    };

    useEffect( ()=>{
        loadBoardVoList();
        loadLocateCategoryVoList();
    }, [])

    const handleRowClick = (id) => {
        // 클릭한 게시글의 상세 페이지로 이동
        navigate(`/community/detail/${id}`);
        
    };

    return (
        <StyledHomeDiv>
            <div>
                <b>자유게시판</b>
                <table>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>조회수</th>
                            <th>추천수</th>
                            <th>작성일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boardBestList.map(vo => 
                            <tr className= "bestThree" key={vo.no} onClick={() => handleRowClick(vo.no)}>
                                <td>{vo.title}</td>
                                <td>{vo.nick}</td>
                                <td>{vo.hit}</td>
                                <td>{vo.likesCount}</td>
                                <td>{vo.enrollDate}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <b id='questHead'>평점 순 퀘스트 </b>
                    <form onSubmit={handleSubmit}>
                        <select name="search">
                            {locateCategoryVoList.map((lcvl) => 
                                <option key={lcvl.no} value={lcvl.no}>{lcvl.name}</option>
                            )}
                        </select>
                        <input type="submit" value="검색"/>
                    </form>
                    <div id='questList'>
                        {questVoList.map((questVo) => (
                            <div key={questVo.no} onClick={() => handlePClick(questVo)}>
                                <div>⚔    {questVo.title}   ⚔  </div>
                                <div>⭐    {questVo.rating}     </div>
                            </div>
                        ))}

                    </div>
                    <div id="page">
                        <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>

                    </div>
                </div>
                <MapContainer selectedQuest={selectedQuest}/>
            </div>
        </StyledHomeDiv>
    );
};

export default Home;