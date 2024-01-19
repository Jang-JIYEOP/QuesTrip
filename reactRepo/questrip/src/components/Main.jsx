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
import { QuestMemoryProvider } from './community/context/QuestContext';
import MemberMain from './member/MemberMain';
import { MemberMemoryProvider } from './community/context/LoginContext';
import MemberSidebar from './member/myPage/MemberSidebar';


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
            <QuestMemoryProvider>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/community/*' element={<CommunityMain/>}></Route>
                    <Route path='/member/*' element={<MemberMain/>}></Route>
                    <Route path='/diary/*' element={<DiaryMain/>}></Route>
                    <Route path='/quest/*' element={<QuestMain/>}></Route>
                    <Route path='/notice/*' element={<NoticeMain/>}></Route>
                    <Route path='/icon/*' element={<IconMain/>}></Route>
                    <Route path='/*' element={<ErrorPageNotFound/>}></Route>
                    <Route path='/myPage' element={<MemberSidebar/>}></Route>
                    <Route></Route>
                </Routes>
            </QuestMemoryProvider>
        </StyledMainDiv>
    );
};

export default Main;