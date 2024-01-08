import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import MapContainer from '../map/MapContainer';
import { useQuestMemory } from '../community/context/QuestContext';




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
    }
    
   
`;

const Home = () => {

    const {questVoList, setCategoryNo} = useQuestMemory();
    const [selectedQuest, setSelectedQuest] = useState(null);
    const mapContainerRef = useRef(null);
   

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedOptionValue = event.target.search.value;
        setCategoryNo(selectedOptionValue );
      };

    const handlePClick = (quest) => {
        setSelectedQuest(quest);
        if (mapContainerRef.current) {
          mapContainerRef.current.onMarkerClick(quest);
        }
  };

    return (
        <StyledHomeDiv>
            <div>자유게시판</div>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <select name="search">
                            <option value="1">서울</option>
                            <option value="2">강릉</option>
                            <option value="3">인천</option>
                        </select>
                        <input type="submit" value="검색"/>
                    </form>
                    <div>
                        {questVoList.map((quest) => (
                            <p key={quest.no} onClick={() => handlePClick(quest)}>
                                ⚔    {quest.title}   ⚔
                            </p>
                        ))}

                    </div>
                </div>
                <MapContainer selectedQuest={selectedQuest}/>
            </div>
        </StyledHomeDiv>
    );
};

export default Home;