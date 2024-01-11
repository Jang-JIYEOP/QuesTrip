import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestList from './QuestList';
import QuestDetail from './QuestDetail';

const QuestMain = () => {
    return (
        
            <Routes>
                <Route path='list' element={<QuestList/>}/>
                <Route path='detail' element={<QuestDetail/>}/>
            </Routes>
    );
};

export default QuestMain;