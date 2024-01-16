import React from 'react';
import DiaryList from './DiaryList';
import DiaryWrite from './DiaryWrite';
import DiaryDetail from './DiaryDetail';
import DiaryEdit from './DiaryEdit';
import { Route, Routes } from 'react-router-dom';

const DiaryMain = () => {
    return (
        <Routes>
            <Route path='list' element={<DiaryList/>}/>
            <Route path='write' element={<DiaryWrite/>}/>
            <Route path='detail/:id' element={<DiaryDetail/>} />
            <Route path='edit' element={<DiaryEdit/>}/>
        </Routes>
    );
};

export default DiaryMain;