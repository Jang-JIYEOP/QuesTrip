import React from 'react';
import { Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';
import AdminLogin from './login/AdminLogin';
import AdminList from './AdminList';
import ErrorPageNotFound from './error/ErrorPageNotFound';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLogin/>}></Route>
            <Route path='/list' element={<AdminList/>}></Route>
            <Route path='/*' element={<ErrorPageNotFound/>}></Route>
            
        </Routes>
    );
};

export default Main;