import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './CommunityList';
import BoardWrite from './CommunityWrite';
import BoardEdit from './CommunityEdit';
import BoardDetail from './CommunityDetail';

const CommunityMain = () => {
    return (
        <Routes>
            <Route path='list' element={<BoardList/>}/>
            <Route path='write' element={<BoardWrite/>}/>
            <Route path='detail' element={<BoardDetail/>}/>
            <Route path='edit' element={<BoardEdit/>}/>
        </Routes>
    );
};

export default CommunityMain;