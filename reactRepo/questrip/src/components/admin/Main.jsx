import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './login/AdminLogin';
import AdminList from './AdminList';
import ErrorPageNotFound from './error/ErrorPageNotFound';
import { QuestMemoryProvider } from '../community/context/QuestContext';
import QuestWrite from './quest/QuestWrite';

const Main = () => {
    return (
        <QuestMemoryProvider>
            
            <Routes>
                <Route path='/' element={<AdminLogin/>}></Route>
                <Route path='/list' element={<AdminList/>}></Route>
                <Route path='/quest/write' element={<QuestWrite/>}></Route>
                <Route path='/*' element={<ErrorPageNotFound/>}></Route>
                
            </Routes>
        </QuestMemoryProvider>
    );
};

export default Main;