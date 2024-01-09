import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberJoin from './MemberJoin'
import MemberLogin from './MemberLogin';

const MemberMain = () => {
    return (
        <Routes>
            <Route path='join' element={<MemberJoin/>}/>
            <Route path='login' element={<MemberLogin/>}/>
        </Routes>
    );
};

export default MemberMain;