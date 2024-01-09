import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuestList from './QuestList';

const QuestMain = () => {
    return (
        
            <Routes>
                <Route path='list' element={<QuestList/>}/>
            </Routes>
    );
};

export default QuestMain;