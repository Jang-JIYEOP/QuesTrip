import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './login/AdminLogin';
import ErrorPageNotFound from './error/ErrorPageNotFound';
import { QuestMemoryProvider } from '../community/context/QuestContext';
import QuestWrite from './quest/QuestWrite';
import IconInsert from './icon/IconInsert';
import MemberList from './memberList/MemberList';
import QuestList from './quest/QuestList';
import NoticeList from './notice/NoticeList';
import DiaryList from './diary/DiaryList';
import CommunityList from './community/CommunityList';
import IconList from './icon/IconList';

const Main = () => {
    return (
        <QuestMemoryProvider>
            
            <Routes>
                <Route path='/' element={<AdminLogin/>}></Route>
                <Route path='/member/list' element={<MemberList/>}></Route>
                <Route path='/quest/list' element={<QuestList/>}></Route>
                <Route path='/notice/list' element={<NoticeList/>}></Route>
                <Route path='/dairy/list' element={<DiaryList/>}></Route>
                <Route path='/community/list' element={<CommunityList/>}></Route>
                <Route path='/membertitle/list' element={<MemberList/>}></Route>
                <Route path='/icon/list' element={<IconList/>}></Route>
                <Route path='/quest/write' element={<QuestWrite/>}></Route>
                <Route path='/icon/insert' element={<IconInsert/>}></Route>
                <Route path='/*' element={<ErrorPageNotFound/>}></Route>
                
            </Routes>
        </QuestMemoryProvider>
    );
};

export default Main;