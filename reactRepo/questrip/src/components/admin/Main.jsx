import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './login/AdminLogin';
import ErrorPageNotFound from './error/ErrorPageNotFound';
import { QuestMemoryProvider } from '../community/context/QuestContext';
import QuestWrite from './quest/QuestWrite';
import MemberList from './memberList/MemberList';
import QuestList from './quest/QuestList';
import NoticeList from './notice/NoticeList';
import DiaryList from './diary/DiaryList';
import CommunityList from './community/CommunityList';
import IconList from './icon/IconList';
import CompleteList from './complete/CompleteList';
import CompleteDetail from './complete/CompleteDetail';
import NoticeWrite from './notice/NoticeWrite';
import NoticeDetail from './notice/NoticeDetail';
import DiaryDetail from './diary/DiaryDetail';
import CommunityDetail from './community/CommunityDetail';
import MemberDetail from './memberList/MemberDetail';
import QuestDetail from './quest/QuestDetail';

const Main = () => {
    return (
        <QuestMemoryProvider>
            
            <Routes>
                <Route path='/' element={<AdminLogin/>}></Route>
                <Route path='/member/list' element={<MemberList/>}></Route>
                <Route path='/quest/list' element={<QuestList/>}></Route>
                <Route path='/notice/list' element={<NoticeList/>}></Route>
                <Route path='/notice/write' element={<NoticeWrite/>}></Route>
                <Route path='/notice/detail' element={<NoticeDetail/>}></Route>
                <Route path='/diary/list' element={<DiaryList/>}></Route>
                <Route path='/diary/detail' element={<DiaryDetail/>}></Route>
                <Route path='/community/list' element={<CommunityList/>}></Route>
                <Route path='/community/detail' element={<CommunityDetail/>}></Route>
                <Route path='/complete/list' element={<CompleteList/>}></Route>
                <Route path='/complete/detail' element={<CompleteDetail/>}></Route>
                <Route path='/membertitle/list' element={<MemberList/>}></Route>
                <Route path='/member/detail' element={<MemberDetail/>}></Route>
                <Route path='/icon/list' element={<IconList/>}></Route>
                <Route path='/quest/detail' element={<QuestDetail/>}></Route>
                <Route path='/quest/write' element={<QuestWrite/>}></Route>
                <Route path='/*' element={<ErrorPageNotFound/>}></Route>
                
            </Routes>
        </QuestMemoryProvider>
    );
};

export default Main;