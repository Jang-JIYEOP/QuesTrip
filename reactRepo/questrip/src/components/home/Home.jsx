import React from 'react';
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
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        & > :nth-child(1){
            width: 100%;
            height: 100%;
            & > form{
                padding: 50px 50px 10px 50px;
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
    return (
        <StyledHomeDiv>
            <div>자유게시판</div>
            <div>
                <div>
                    <form action="">
                        <select name="search">
                            <option value="">지역</option>
                            <option value="">지역</option>
                            <option value="">지역</option>
                        </select>
                        <input type="submit" value="검색"/>
                    </form>
                    <div>aaa</div>
                </div>
                <MapContainer/>
            </div>
        </StyledHomeDiv>
    );
};

export default Home;