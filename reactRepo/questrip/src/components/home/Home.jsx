import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MapContainer from '../map/MapContainer';
import { useQuestMemory } from '../community/context/QuestContext';
import Page from '../page/Page';




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
    const [selectedQuest, setSelectedQuest] = useState(null);
    const mapContainerRef = useRef(null);
    useEffect(() => {
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

    const handlePClick = (questVo) => {
        setSelectedQuest(questVo);
        if (mapContainerRef.current) {
          mapContainerRef.current.onMarkerClick(questVo);
        }
    };

    return (
        <StyledHomeDiv>
            <div>자유게시판</div>
            <div>
                <div>
                    <b id='questHead'>평점 순 퀘스트 </b>
                    <form onSubmit={handleSubmit}>
                        <select name="search">
                            <option value="1">서울</option>
                            <option value="2">강릉</option>
                            <option value="3">인천</option>
                        </select>
                        <input type="submit" value="검색"/>
                    </form>
                    <div id='questList'>
                        {questVoList.map((questVo) => (
                            <div key={questVo.no} onClick={() => handlePClick(questVo)}>
                                <div>⚔    {questVo.title}   ⚔  </div>
                                <div>🕸    {questVo.rating}     </div>
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