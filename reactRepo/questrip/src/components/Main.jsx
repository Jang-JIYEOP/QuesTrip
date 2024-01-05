import React from 'react';
import styled from 'styled-components';
import Home from './home/Home';
import { Route, Routes } from 'react-router-dom';
import CommunityMain from './community/CommunityMain';
import DiaryMain from './diary/DiaryMain';
import NoticeMain from './notice/NoticeMain';
import ErrorPageNotFound from './error/ErrorPageNotFound';
import QuestMain from './quest/QuestMain';
import IconMain from './icon/IconMain';


const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    place-items: center center;
    
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/community/*' element={<CommunityMain/>}></Route>
                <Route path='/diary/*' element={<DiaryMain/>}></Route>
                <Route path='/quest/*' element={<QuestMain/>}></Route>
                <Route path='/notice/*' element={<NoticeMain/>}></Route>
                <Route path='/icon/*' element={<IconMain/>}></Route>
                <Route path='/*' element={<ErrorPageNotFound/>}></Route>
                <Route></Route>
            </Routes>
        </StyledMainDiv>
    );
};

export default Main;